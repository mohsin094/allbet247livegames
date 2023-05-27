<?php

namespace common\models;

use Yii;
use yii\web\IdentityInterface;
use common\models\Sessions;
use common\models\UserRoles;
use \common\components\Tools;

/**
 * This is the model class for collection "users".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $email
 * @property mixed $password
 * @property mixed $status
 * @property mixed $cdate
 * @property mixed $lang
 * @property mixed $balance
 */
class Users extends \yii\mongodb\ActiveRecord implements IdentityInterface
{
    const SCENARIO_REGISTER = 'register';
    const SCENARIO_LOGIN = 'login';

    const STATUS_ACTIVE = 'active';
    const STATUS_WAITING_CONFIRMATION = 'waiting_confirmation';

    public $password_repeat;

    public function formName()
    {
        return '';
    }


    public function afterSave($insert, $changedAttributes)
    {  
        if($insert) {
            $auth = \Yii::$app->authManager;
         
            $role = $auth->getRole($this->role);
            $auth->assign($role, $this->getId());
        }

        return parent::afterSave($insert, $changedAttributes);
    }

    public function beforeValidate()
    {

        if($this->isNewRecord) {
            $this->cdate = (string) time();
            $this->role = UserRoles::ROLE_USER;
            $this->public_name = 'bg_'.rand(1,9).time();
            $this->email = strtolower(trim($this->email));
            $this->status = self::STATUS_WAITING_CONFIRMATION;
            $this->balance = '0';
        }
        $this->balance = (string) $this->balance;
        return parent::beforeValidate();
    }

    public function beforeSave($params)
    {
        if($this->isNewRecord) {
            $this->password = $this->encryptPassword($this->password);
        }

        return parent::beforeSave($params);
    }

    public function publicAttributes()
    {
        return [
            'id' => (string) $this->_id,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'role' => \Yii::$app->user->getIdentity()->role,
            'status' => $this->status,
            'balance' => $this->balance
        ];
    }

    public function scenarios()
    {
        return array_merge(parent::scenarios(), [
            self::SCENARIO_LOGIN => ['email', 'password'],
            self::SCENARIO_REGISTER => ['email', 'password', 'password_repeat', 'avatar']
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'users'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'email',
            'public_name',
            'password',
            'status',
            'cdate',
            'lang',
            'role',
            'avatar',
            'balance',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['email', 'password', 'cdate', 'role', 'public_name', 'balance'], 'required'],
            ['password_repeat', 'required', 'on' => self::SCENARIO_REGISTER],
            [['email', 'password', 'lang', 'role', 'balance'], 'string'],
            [['email'], 'email'],
            [['password_repeat'], 'compare', 'compareAttribute' => 'password', 'operator' => '=='],
            // [['email', 'password', 'status', 'cdate', 'lang', 'user_role_id'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'email' => Yii::t('app', 'Email'),
            'password' => Yii::t('app', 'Password'),
            'status' => Yii::t('app', 'Status'),
            'cdate' => Yii::t('app', 'Cdate'),
            'lang' => Yii::t('app', 'Lang'),
            'user_role_id' => Yii::t('app', 'Role'),
            'balance' => Yii::t('app', 'Balance')
        ];
    }

    public static function findByUsername($username)
    {
        return self::findOne(['email' => $username]);
    }
    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return isset(self::$users[$id]) ? new static(self::$users[$id]) : null;
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        if($model = Sessions::findOne(['token' => $token])) {

            return self::findOne(['_id' => $model->user_id]);
        }

        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return (string) $this->_id;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return \Yii::$app->getSecurity()->validatePassword($password, $this->password);
    }
    /*
     {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->auth_key === $authKey;
    }

    public static function encryptPassword($input)
    {
        return \Yii::$app->getSecurity()->generatePasswordHash($input);
    }
}
