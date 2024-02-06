<?php

namespace app\modules\payment\models;

use Yii;

/**
 * This is the model class for collection "payment_transactions".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $amount
 * @property mixed $trans_id
 * @property mixed $cdate
 * @property mixed $udate
 * @property mixed $gateway
 * @property mixed $status
 */
class PaymentTransactions extends \yii\mongodb\ActiveRecord
{

    const GATEWAY_STRIPE = 'stripe';
    const GATEWAY_PAYPAL = 'paypal';

    const STATUS_WAITING = 'waiting';
    const STATUS_PAYED = 'payed';
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'payment_transactions'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'user_id',
            'amount',
            'trans_id',
            'cdate',
            'udate',
            'gateway',
            'status',
        ];
    }

    public function beforeValidate()
    {
        if($this->isNewRecord) {
            $this->cdate = (string) time();
            $this->udate = (string) time();
        }
        return parent::beforeValidate();
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'amount', 'trans_id', 'cdate', 'udate', 'gateway', 'status'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'amount' => Yii::t('app', 'Amount'),
            'user_id' => Yii::t('app', 'User ID'),
            'trans_id' => Yii::t('app', 'Trans ID'),
            'cdate' => Yii::t('app', 'Cdate'),
            'udate' => Yii::t('app', 'Udate'),
            'gateway' => Yii::t('app', 'Gateway'),
            'status' => Yii::t('app', 'Status'),
        ];
    }
}
