<?php

namespace app\modules\user\controllers;

use app\modules\user\components\ApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use \common\models\Users;

use yii\helpers\Url;

class ProfileController extends ApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get', 'update'],
                        'roles' => ['@'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionGet()
	{
		
		$this->resp->result = true;
		$this->resp->params = \Yii::$app->user->getIdentity()->publicAttributes();
	

		return $this->resp;
	
	}

	public function actionUpdate()
	{
		$model = Users::findOne(['_id' => \Yii::$app->user->id]);
		$model->scenario = Users::SCENARIO_UPDATE;
		if($model && $model->load(\Yii::$app->request->bodyParams, '') && $model->save()) {
			
			$this->resp->result = true;
			$this->resp->params = $model->publicAttributes();
		}

		return $this->resp;
	}
}