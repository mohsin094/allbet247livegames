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
                        'actions' => ['get-configs'],
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

    public function actionGetConfigs()
    {
        $rounds = GameRounds::find()->All();
        $stakes = GameStakes::find()->All();
        $timeframes = GameTimeframes::find()->All();

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
        $model->type = Matches::CASH_GAME;

        if($model->load(\Yii::$app->request->bodyParams) && $model->createNewMatch()) {
            $this->resp->result = true;
        }
    }
}
