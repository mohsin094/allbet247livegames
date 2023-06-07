<?php

namespace common\components;

use common\components\CommonController;
use yii\web\Response;
use common\models\Sessions;

class CommonApiController extends CommonController
{
	public $session;
	public $resp = null;

	public function init()
	{
		parent::init();
		$this->resp = (object) [
			'result' => false,
			'params' => []
		];

		if(YII_DEBUG) {
        	$this->resp->debug = [];
		}
		$this->session = new Sessions;
        \Yii::$app->user->enableAutoLogin = false;
        \Yii::$app->user->enableSession = false;
	}
	
	public function beforeAction($action)
	{
		\Yii::$app->request->parsers = [
			'application/json' => 'yii\web\JsonParser'
		];
		\Yii::$app->response->format = Response::FORMAT_JSON;
		\Yii::$app->response->charset = 'UTF-8';
		\Yii::$app->response->headers->set('Origin', \Yii::$app->params['clientOrigin']);
		\Yii::$app->response->headers->set('Access-Control-Allow-Origin', \Yii::$app->params['clientOrigin']);
		\Yii::$app->response->headers->set('Access-Control-Allow-Headers', '*');
		\Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');

		if((\Yii::$app->user->isGuest && $accessToken = \Yii::$app->request->getHeaders()->get('x-sid-token')) || (\Yii::$app->user->isGuest && $accessToken = \Yii::$app->request->get('x-sid-token'))) {
            \Yii::$app->user->loginByAccessToken($accessToken);
        }

		return parent::beforeAction($action);
	}

	public function error($error)
	{
		$this->resp->error = $error;
	}

	public function status($status)
	{
		\Yii::$app->response->status = $status;
		return $this;
	}

	public function debug($param)
    {
        if(YII_DEBUG) {
            $this->resp->debug += $param;
        }
        return $this;
    }

    public function action($action)
    {
    	$this->resp->action = $action->get();
    	return $this;
    }
}