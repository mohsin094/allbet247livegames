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
    const NAME_SHARE_PERCENT = 'share_percent';
    

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
