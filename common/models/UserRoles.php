<?php

namespace common\models;

use Yii;

/**
 * This is the model class for collection "user_roles".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $name
 */
class UserRoles extends \yii\mongodb\ActiveRecord
{
    const ROLE_AGENT = 'agent';
    const ROLE_ADMIN = 'admin';
    const ROLE_USER = 'user';

    public static function getRolesList()
    {
        return [
            self::ROLE_USER => 'user',
            self::ROLE_ADMIN => 'admin',
            self::ROLE_AGENT => 'agent'
        ];
    }

    public static function getRole($role)
    {
        return self::findOne(['name' => $role]);
    }

    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'user_roles'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'name',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'safe']
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
        ];
    }
}
