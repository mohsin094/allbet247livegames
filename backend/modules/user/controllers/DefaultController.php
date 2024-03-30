<?php

namespace app\modules\user\controllers;

use app\modules\user\components\ApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use \common\models\Users;

use yii\helpers\Url;

class DefaultController extends ApiController
{
    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['find-player'],
                        'roles' => ['@'],
                        'allow' => true,
                    ],
                ],
            ]
        ]);
    }

    public function actionFindPlayer($publicName)
    {
        $users = Users::find()
        ->select(['_id', 'public_name'])
        ->where(['public_name' => $publicName])
        ->all();

        $this->resp->result = true;
        $this->resp->params = $users;
        return $this->resp;
    }
}
