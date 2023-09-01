<?php


namespace backend\modules\user\components;


class User extends \yii\web\User
{


    public function afterLogin($identity, $cookieBased, $duration)
    {

        $auth = \Yii::$app->getAuthManager();
        try {
            $auth->revokeAll((string)\Yii::$app->user->id);
            $role = $auth->getRole($identity->role);
            
            $auth->assign($role, $identity->id);
        }catch(\Exception $e) {

        }
        parent::afterLogin($identity, $cookieBased, $duration);
    }

}