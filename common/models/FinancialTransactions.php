<?php

namespace common\models;

use Yii;
use common\models\Users;
/**
 * This is the model class for collection "financial_transactions".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $user_id
 * @property mixed $source
 * @property mixed $source_id
 * @property mixed $type
 * @property mixed $amount
 * @property mixed $description
 * @property mixed $cdate
 */
class FinancialTransactions extends \yii\mongodb\ActiveRecord
{
    const TYPE_INCREASE = 'increase';
    const TYPE_DECREASE = 'decrease';


    public static function new($userId, $amount, $type, $source, $sourceId, $description) {
        $model = new self;
        $model->user_id = $userId;
        $model->amount = (string) $amount;
        $model->source = $source;
        $model->source_id = $sourceId;
        $model->type = $type;
        $model->description = $description;
        if($model->save()) {
            return $model;
        }else {
            \Yii::error('save financial_transactions failed:'.$model->getErrorSummary(true));
        }

        return false;
    }
    
    public function formName()
    {
        return '';
    }

    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'financial_transactions'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'user_id',
            'source',
            'source_id',
            'type',
            'amount',
            'description',
            'cdate',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'source', 'source_id', 'type', 'amount', 'description', 'cdate'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'user_id' => Yii::t('app', 'User ID'),
            'source' => Yii::t('app', 'Source'),
            'source_id' => Yii::t('app', 'Source ID'),
            'type' => Yii::t('app', 'Type'),
            'amount' => Yii::t('app', 'Amount'),
            'description' => Yii::t('app', 'Description'),
            'cdate' => Yii::t('app', 'Cdate'),
        ];
    }

    public function getUser()
    {
        return $this->hasOne(Users::class, ['_id' => 'user_id']);
    }
}
