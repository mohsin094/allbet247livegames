<?php

namespace backend\controllers;

use backend\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use \common\models\Settings;

class AdminSettingController extends AdminApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get', 'update'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionUpdate($id)
	{
		$model = Settings::findOne(['_id' => (string) $id]);
		if($model && $model->load(\Yii::$app->request->bodyParams, '') && $model->save()) {
			$this->resp->result = true;
			$this->resp->params = $model->attributes;
		}

		return $this->resp;
	}

	public function actionGet()
	{
		$this->resp->result = true;
		$this->resp->params = Settings::getSetting();

		return $this->resp;
	}
}