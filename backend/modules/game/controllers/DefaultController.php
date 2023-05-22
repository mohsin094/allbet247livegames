<?php

namespace backend\modules\game\controllers;

use \backend\modules\game\components\ApiController;
use \common\components\Tools;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \backend\modules\game\models\GameRounds;
use \backend\modules\game\models\GameTimeframes;
use \backend\modules\game\models\GameStakes;
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
}
