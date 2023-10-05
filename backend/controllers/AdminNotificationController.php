<?php

namespace backend\controllers;

use backend\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use \common\models\Notifications;

class AdminNotificationController extends AdminApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['add'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionAdd()
	{
		$model = new Notifications;

		if($model->load(\Yii::$app->request->bodyParams, '') && $model->save()) {
			$this->resp->result = true;
		}

		return $this->resp;
	}
}