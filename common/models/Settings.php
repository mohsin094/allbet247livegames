<?php

namespace common\models;

use Yii;

/**
 * This is the model class for collection "settings".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $name
 * @property mixed $value
 * @property mixed $description
 */
class Settings extends \yii\mongodb\ActiveRecord
{

    const NAME_SITE_NAME = 'site_name';
    const NAME_WEBHOOK_URL = 'webhook_url';
    const NAME_MAVENS_API_URL = 'mavens_api_url';
    const NAME_MAVENS_SERVER_URL = 'mavens_server_url';
    const NAME_MAVENS_API_PASSWORD = 'mavens_api_password';
    const NAME_MAVENS_API_VERSION = 'mavens_api_version';
    const NAME_MAVENS_CALLBACK_PASSWORD = 'mavens_callback_password';
    const NAME_SHARE_PERCENT = 'share_percent';
    const NAME_STRIPE_API_KEY = 'stripe_api_key';
    const NAME_PAYPAL_CLIENT_ID = 'paypal_client_id';
    const NAME_PAYPAL_CLIENT_SECRET = 'paypal_client_secret';
    

    public static function getSetting($name=null)
    {
        if($name)
            return self::find()->where(['name' => $name])
        // ->asArray()
        ->one();

        return self::find()->indexBy('name')
        // ->asArray()
        ->all();
    }

    public static function getSettingValue($name)
    {
        $models = self::find()->indexBy('name')->all();
        // print_r($models);
        if(array_key_exists($name, $models)) {
            return $models[$name]->value;
        }
        return '';
    }

    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'settings'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'name',
            'value',
            'description',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'value', 'description'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'name' => Yii::t('app', 'Name'),
            'value' => Yii::t('app', 'Value'),
            'description' => Yii::t('app', 'Description'),
        ];
    }
}
