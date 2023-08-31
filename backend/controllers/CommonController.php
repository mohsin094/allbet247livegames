<?php

namespace backend\controllers;

use \backend\components\ApiController;
use yii\helpers\Url;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
class CommonController extends ApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get-avatars-list'],
                        'roles' => ['@', '?'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionGetAvatarsList()
	{
		$array = [];
		for($i = 1; $i<46; $i++) {
			$array[$i] = \Yii::$app->params['clientUrl'].'/assets/images/avatars/'.$i.'.png';
		}
		$this->resp->result = true;
		$this->resp->params = $array;

		return $this->resp;
	}
}