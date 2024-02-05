<?php

namespace app\modules\payment\controllers;

use app\modules\poker\components\ApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use yii\helpers\Url;
use common\models\Settings;
use app\modules\payment\models\PaymentTransactions;
/**
 * Default controller for the `payment` module
 */
class StripeController extends ApiController
{
    public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['new-transaction'],
                        'roles' => ['@'],
                        'allow' => true,
                    ],
                    [
                    	'actions' => ['check-transaction'],
                    	'roles' => ['@', '?'],
                    	'allow' => true
                    ]
                ],
            ]
		]);
	}

	public function actionNewTransaction($amount)
	{
		$amount *= 100;
		$trans = new PaymentTransactions;
		$trans->gateway = PaymentTransactions::GATEWAY_STRIPE;
		$trans->amount = $amount;
		$trans->user_id = (string) \Yii::$app->user->id;

		if($trans->save()) {

			\Stripe\Stripe::setApiKey(Settings::getSettingValue(Settings::NAME_STRIPE_API_KEY));

	        $checkoutSession = \Stripe\Checkout\Session::create([
	          'line_items' => [[
	            'price_data' => [
	            	'currency' => 'usd',
	            	'unit_amount' => $amount,
	            	'product_data' => [
	            		'name' => 'Deposit Into Account'
	            	]
	            ],
	            'quantity' => 1
	          ]],
	          'mode' => 'payment',
	          'success_url' => Url::to(['/payment/stripe/check-transaction', 'id' => (string) $trans->_id], true),
	          'cancel_url' => Url::to(['/payment/stripe/check-transaction', 'id' => (string) $trans->_id], true),
	        ]);

	        $this->resp->result = true;
	        $this->resp->params = ['url' => $checkoutSession->url];
		}

        return $this->resp;
	}

	public function actionCheckTransaction($id)
	{
		return $this->redirect(\Yii::$app->params['clientUrl']);
	}
}
