<?php

namespace backend\modules\user\models;

use Yii;
use common\models\Users;

/**
 * This is the model class for collection "user_subsets".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $user_id
 * @property mixed $caller_id
 */
class UserSubsets extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'user_subsets'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'user_id',
            'caller_id',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'caller_id'], 'safe']
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
            'caller_id' => Yii::t('app', 'Caller ID'),
        ];
    }

    public function getUser()
    {
        return $this->hasOne(Users::class, ['_id' => 'user_id']);
    }

    public function getCaller()
    {
        return $this->hasOne(Users::class, ['_id' => 'caller_id']);
    }
}
