<?php

namespace app\modules\payment\controllers;

use app\modules\poker\components\ApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use yii\helpers\Url;
use common\models\Settings;
use app\modules\payment\models\PaymentTransactions;
use \common\models\UsersRepo;
use \common\models\FinancialTransactions;
/**
 * Default controller for the `payment` module
 */
class PaypalController extends ApiController
{
    public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get-client-id'],
                        'roles' => ['@'],
                        'allow' => true,
                    ]
                ],
            ]
		]);
	}

	public function actionGetClientId()
	{
		$clientId = Settings::getSettingValue(Settings::NAME_PAYPAL_CLIENT_ID);

		$this->resp->result = true;
		$this->resp->params = [
			'id' => $clientId
		];

		return $this->resp;
	}
}
