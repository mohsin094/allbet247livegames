<?php


namespace backend\modules\user\components;

use common\components\Tools;

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
            print_r($e->getMessage());
        }
        parent::afterLogin($identity, $cookieBased, $duration);
    }

}