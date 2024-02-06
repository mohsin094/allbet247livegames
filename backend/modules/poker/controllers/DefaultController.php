<?php

namespace app\modules\poker\controllers;

use app\modules\poker\components\ApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
/**
 * Default controller for the `poker` module
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
                        'actions' => ['get-balance', 'get-session'],
                        'roles' => ['@'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionGetSession()
	{
		$url = \Yii::$app->mavens->account->mavensUrl(\Yii::$app->user->getIdentity()->public_name);

		$this->resp->result = true;
		$this->resp->params = ['url' => $url];

		return $this->resp;
	}

	public function actionGetBalance()
	{
		$player = \Yii::$app->mavens->account->get(\Yii::$app->user->getIdentity()->public_name);

		if($player->success) {
			$this->resp->params = [
				'balance' => $player->params->Balance
			];
			$this->resp->result = true;

		}

		return $this->resp;
	}
}
