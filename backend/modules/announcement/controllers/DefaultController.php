<?php

namespace backend\modules\announcement\controllers;

use backend\modules\announcement\components\ApiController;
use \common\components\Tools;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use backend\modules\announcement\models\Announcements;

/**
 * Default controller for the `announcement` module
 */
class DefaultController extends ApiController
{

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get', 'list'],
                        'roles' => ['@'],
                        'allow' => true,
                    ]
                ],
            ]
        ]);
    }

    public function actionList()
    {
        $models = Announcements::find()
        ->select(['_id', 'title', 'text_body', 'cdate', 'type'])
        ->limit(10)
        // ->asArray()
        ->all();

        $this->resp->result = true;
        $this->resp->params = $models;
        return $this->resp;
    }

    public function actionGet($id)
    {
        $model = Announcements::findOne([
            '_id' => (string) $id
        ]);

        if($model) {
            $this->resp->result = true;
            
            $this->resp->params = $model;
        }

        return $this->resp;
    }
}
