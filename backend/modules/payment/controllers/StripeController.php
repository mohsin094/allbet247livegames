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
		$trans->amount = $amount / 100;
		$trans->user_id = (string) \Yii::$app->user->id;
		$trans->status = PaymentTransactions::STATUS_WAITING;
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

	        $trans->trans_id = $checkoutSession->id;
	        $trans->save();

	        $this->resp->result = true;
	        $this->resp->params = ['url' => $checkoutSession->url];
		}

        return $this->resp;
	}

	public function actionCheckTransaction($id)
	{
		$session = new \Stripe\StripeClient(Settings::getSettingValue(Settings::NAME_STRIPE_API_KEY));
		$trans = PaymentTransactions::findOne(['_id' => $id, 'status' => PaymentTransactions::STATUS_WAITING]);

		if($trans) {
			$session = $session->checkout->sessions->retrieve($trans->trans_id, []);
			if($session->amount_total / 100 <= $trans->amount && $session->payment_status == 'paid') {
				$userRepo = UsersRepo::findOne(['_id' => $trans->user_id]);
				$userRepo->increaseBalance($trans->amount, self::class, (string) $trans->_id, 'Deposit', FinancialTransactions::TYPE_DEPOSIT);
			}
		}
		return $this->redirect(\Yii::$app->params['clientUrl'].'/cashier');
	}
}
