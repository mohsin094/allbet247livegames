<?php

namespace common\models;

use Yii;

/**
 * This is the model class for collection "tokens".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $type
 * @property mixed $token
 * @property mixed $exp
 * @property mixed $user_id
 */
class Tokens extends \yii\mongodb\ActiveRecord
{
    const TYPE_REGISTER = 'register';
    const TYPE_RESET_PASSWORD = 'reset_password';

    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'tokens'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'type',
            'token',
            'exp',
            'user_id',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['type', 'token', 'exp', 'user_id'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'type' => Yii::t('app', 'Type'),
            'token' => Yii::t('app', 'Token'),
            'exp' => Yii::t('app', 'Exp'),
            'user_id' => Yii::t('app', 'User ID'),
        ];
    }
}
