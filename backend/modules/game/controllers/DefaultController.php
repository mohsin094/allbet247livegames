<?php

namespace backend\modules\game\controllers;

use \backend\modules\game\components\ApiController;
use \common\components\Tools;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \backend\modules\game\models\GameRounds;
use \backend\modules\game\models\GameTimeframes;
use \backend\modules\game\models\GameStakes;
use \backend\modules\game\models\MatchesRepo;
use \backend\modules\game\models\Matches;
use \common\models\Users;
/**
 * Default controller for the `game` module
 */
class DefaultController extends ApiController
{
    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get-configs', 'get-waiting', 'get-match', 'player-public-info'],
                        'roles' => ['?', '@'],
                        'allow' => true,
                    ],
                    [
                        'actions' => ['new', 'join', 'my-games', 'cancel'],
                        'roles' => ['@'],
                        'allow' => true
                    ]
                ],
            ]
        ]);
    }

    public function actionMyGames()
    {

        $games = Matches::find()
        ->where([
            
                'OR',
                [
                    'home_id' => \Yii::$app->user->id,
                    // 'away_id' => \Yii::$app->user->id
                ]
            
        ])->andWhere([
            'OR',
            [
                'status' => Matches::STATUS_PLAYING,
                'status' => Matches::STATUS_WAITING,
            ]
        ])
        // ->asArray()
        ->all();

        $this->resp->params = $games;
        Tools::debug($games, true);
        return $this->resp;
    }

    public function actionPlayerPublicInfo($playerId)
    {
        $player = Users::findOne(['_id' => $playerId]);

        if($player) {
            $this->resp->result = true;
            $this->resp->params = [
                'public_name' => $player->public_name,
                'avatar' => $player->avatar,
                'avatar_link' => \Yii::$app->params['clientUrl'].'/assets/images/avatars/'.$player->avatar.'.png'
            ];
        }

        return $this->resp;
    }

    public function actionCancel($matchId)
    {
        $match = MatchesRepo::find()->where(['_id' => $matchId, 'home_id' => \Yii::$app->user->id, 'status' => Matches::STATUS_WAITING])->one();

        if($match) {
            if($match->cancel()) {
                $this->resp->result = true;
            }
        }
        

        return $this->resp;
    }

    public function actionJoin($matchId)
    {
        $match = Matches::find()->where(['_id' => $matchId, 'status' => Matches::STATUS_WAITING])->one();
        if($match && $match->home_id != \Yii::$app->user->id) {
            $match->away_id = \Yii::$app->user->id;
            if($match->home_id != null) {
                $match->status = Matches::STATUS_PLAYING;
            }
            if($match->save()) {
                $this->resp->result = true;
            }
        }elseif($match && $match->home_id == \Yii::$app->user->id) {
            if($match->away_id != null) {
                $match->status = Matches::STATUS_PLAYING;
            }
            if($match->save()) {
                $this->resp->result = true;
            }
        }

        return $this->resp;
    }

    public function actionGetMatch($id)
    {
        $match = Matches::find()->where(['_id' => $id])->one();

        if($match) {
            $this->resp->result = true;
            $this->resp->params = [
                'away_id' => ($match->away_id != null) ? $match->away_id : null,
                'home_id' => $match->home_id,
                'id' => (string)$match->_id,
            ];
        }

        return $this->resp;
    }

    public function actionGetWaiting()
    {
        $this->resp->result = true;
        $stakes = GameStakes::find()->all();
        $rounds = GameRounds::find()->all();
        $timeframes = GameTimeframes::find()->all();

        $finalStakes = [];
        foreach($stakes as $stake) {
            $finalStakes[(string) $stake->_id] = $stake;
        }

        $finalRounds = [];
        foreach($rounds as $round) {
            $finalRounds[(string) $round->_id] = $round;
        }

        $finalTimeframes = [];
        foreach($timeframes as $tf) {
            $finalTimeframes[(string) $tf->_id] = $tf;
        }

        
        $matches = Matches::find()
            ->select(['_id', 'home_id', 'away_id', 'type', 'round_id', 'stake_id', 'timeframe_id','status'])
            ->where(['type' => Matches::TYPE_CASH_GAME, 'status' => Matches::STATUS_WAITING])
            ->all();

        $final = [];

        foreach($matches as $match) {
            $home = ($match->home_id != null) ? Users::findOne(['_id' => $match->home_id]) : null;
            $away = ($match->away_id != null) ? Users::findOne(['_id' => $match->away_id]) : null;

            $final[(string) $match->_id] = [
                'id' => (string) $match->_id,
                'home' => [
                    'public_name' => $home->public_name,
                    'avatar' => $home->avatar,
                    'id' => (string) $home->_id,
                    'lvl' => ($home->lvl == null) ? 1 : $home->lvl
                ],
                'away' => $away,
                'type' => $match->type,
                'stake' => $finalStakes[$match->stake_id]->stake,
                'round' => $finalRounds[$match->round_id]->round,
                'timeframe' => $finalTimeframes[$match->timeframe_id]->timeframe,
            ];
        }

        $this->resp->params = $final;
        return $this->resp;
    }

    public function actionGetConfigs()
    {
        $rounds = GameRounds::find()->all();
        $stakes = GameStakes::find()->where(['status' => GameStakes::STATUS_ACTIVE])->all();
        $timeframes = GameTimeframes::find()->all();

        $this->resp->result = true;
        $this->resp->params = [
            'rounds' => $rounds,
            'stakes' => $stakes,
            'timeframes' => $timeframes
        ];

        return $this->resp;
    }

    public function actionNew()
    {
 
        $model = new MatchesRepo;
        $model->home_id = \Yii::$app->user->id;
        $model->type = Matches::TYPE_CASH_GAME;

        if($model->load(\Yii::$app->request->bodyParams) && $model->createNewMatch()) {
            $this->resp->result = true;
        }else {
            $this->error($model->getErrors());
        }

        return $this->resp;
    }
}
