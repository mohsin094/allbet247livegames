<?php

namespace app\modules\user\controllers;

use app\modules\user\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use \common\models\UserRoles;
use \common\models\Users;
use backend\modules\user\models\UserSubsets;

class AdminController extends AdminApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                	[
                		'actions' => ['list', 'get-status-list', 'get-roles-list'],
                		'roles' => ['admin', 'agent'],
                		'allow' => true
                	],
                    [
                        'actions' => ['update', 'get'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionGet($userId)
	{
		$user = Users::findOne(['_id' => $userId]);
		$agent = UserSubsets::find()
		->with(['caller'])
		->where(['user_id' => $userId])
		->one();

		$result = $user->attributes;
		
		if($agent) {
			$result += [
				'agent' => $agent->caller
			];
		}
		$this->resp->result = true;
		$this->resp->params = $result;

		return $this->resp;
	}

	public function actionUpdate($userId)
	{
		$model = Users::findOne(['_id' => $userId]);
		$model->scenario = Users::SCENARIO_UPDATE_ADMIN;

		if($model && $model->load(\Yii::$app->request->bodyParams, '') && $model->save()) {
			$this->resp->result = true;
			$this->resp->params = $model;
		}else {
			$this->error($model->getErrors());
		}

		return $this->resp;
	}

	public function actionGetRolesList()
	{
		$this->resp->result = true;
		$this->resp->params = UserRoles::getRolesList();

		return $this->resp;
	}

	public function actionGetStatusList()
	{
		$this->resp->result = true;
		$this->resp->params = Users::getStatusList();

		return $this->resp;
	}

	public function actionList($limit=50, $page=1, $query = '')
	{
		$subsets = [];
		if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
			$subsets = UserSubsets::find()
			->where(['caller_id' => \Yii::$app->user->id])
			->indexBy('user_id')
			->asArray()
			->all();
			$subsets = array_keys($subsets);
		}

		$models = Users::find()
		->orderBy('cdate DESC')
		->limit($limit)
		->offset(($page-1) * $limit);

		if(!empty($subsets) && \Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
			$models->where(['in', '_id', $subsets]);
		}

		if(!empty($query)) {
			$models = $models->where(['email' => ['$regex' => $query]]);
			$models = $models->orWhere(['public_name' => ['$regex' => $query]]);
		}

		$models = $models
		// ->asArray()
		->all();

		$this->resp->result = true;
		$this->resp->params = $models;

		return $this->resp;
	}
}