<?php
namespace backend\modules\ticket\controllers;

use backend\modules\ticket\components\ApiController;
use backend\modules\ticket\models\Tickets;
use backend\modules\ticket\models\TicketMessages;
use \common\components\Tools;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;

class DefaultController extends ApiController
{
	public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get', 'list', 'new', 'reply'],
                        'roles' => ['@'],
                        'allow' => true,
                    ]
                ],
            ]
        ]);
    }

    public function actionList()
    {
    	$models = Tickets::find()
    	->select(['_id', 'title', 'udate', 'status'])
    	->where(['user_id' => \Yii::$app->user->id])
    	// ->asArray()
    	->all();

    	$this->resp->result = true;
    	$this->resp->params = $models;
    	return $this->resp;
    }

    public function actionGet($id)
    {
    	$model = Tickets::findOne([
    		'_id' => (string) $id,
    		'user_id' => \Yii::$app->user->id
    	]);

    	if($model) {
    		$this->resp->result = true;
    		$messages = TicketMessages::find()->select(['message','cdate'])->where(['ticket_id' => (string) $model->_id])
            // ->asArray()
            ->all();
    		$this->resp->params = [
    			'title' => $model->title,
    			'status' => $model->status,
    			'messages' => $messages
    		];
    	}

    	return $this->resp;
    }

    public function actionReply($id)
    {
    	$model = Tickets::findOne(['_id' => (string) $id]);

    	if($model && $model->reply(\Yii::$app->request->bodyParams)) {
    		$this->resp->result = true;
    	}

    	return $this->resp;
    }

    public function actionNew()
    {
    	$model = new Tickets;

    	if($model->createNewTicket(\Yii::$app->request->bodyParams)) {
    		$this->resp->result = true;
    		$this->resp->params = [
    			'id' => (string) $model->_id,
    		];
    	}

    	return $this->resp;
    }
}