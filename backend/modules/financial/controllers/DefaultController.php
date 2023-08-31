<?php

namespace backend\modules\financial\controllers;

use backend\modules\announcement\components\ApiController;
use \common\components\Tools;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\models\FinancialTransactions;
/**
 * Default controller for the `financial` module
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
                        'actions' => ['list'],
                        'roles' => ['@'],
                        'allow' => true,
                    ]
                ],
            ]
        ]);
    }

    public function actionList()
    {
        
    }
}
