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
                        'actions' => ['get-configs', 'get-waiting'],
                        'roles' => ['?', '@'],
                        'allow' => true,
                    ],
                    [
                        'actions' => ['new'],
                        'roles' => ['@'],
                        'allow' => true
                    ]
                ],
            ]
        ]);
    }

    public function actionGetWaiting()
    {
        $this->resp->result = true;

        $matches = Matches::find()
            ->select(['_id', 'home_id', 'away_id', 'type', 'round_id', 'stake_id', 'timeframe_id','status'])
            ->where(['type' => Matches::TYPE_CASH_GAME, 'status' => Matches::STATUS_WAITING])
            ->all();

        $this->resp->params = $matches;
        return $this->resp;
    }

    public function actionGetConfigs()
    {
        $rounds = GameRounds::find()->All();
        $stakes = GameStakes::find()->All();
        $timeframes = GameTimeframes::find()->All();

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
