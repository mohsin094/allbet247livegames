<?php

namespace app\modules\user\controllers;

use app\modules\user\components\ApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use \common\models\Users;
use \common\models\UsersRepo;
use yii\helpers\Url;
use backend\modules\user\models\UserSubsets;

class ProfileController extends ApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get', 'update', 'get-invitation-link', 'get-subsets'],
                        'roles' => ['@'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionGetSubsets()
	{
		$subsets = UserSubsets::find()
		->with(['user'])
		->where(['caller_id' => \Yii::$app->user->id])
		->all();

		$result = [];
		foreach($subsets as $s) {
			$p = $s->attributes;
			$p['user'] = [
				'avatar' => $s->user->avatar,
				'public_name' => $s->user->public_name
			];
			array_push($result, $p);
		}

		$this->resp->result = true;
		$this->resp->params = $result;

		return $this->resp;
	}

	public function actionGetInvitationLink()
	{
		$user = UsersRepo::findOne(['_id' => \Yii::$app->user->id]);

		$this->resp->result = true;
		$this->resp->params = [
			'link' => \Yii::$app->params['clientUrl'] . '?callerId=' . $user->getInvitationId()
		];

		return $this->resp;
	}

	public function actionGet()
	{
		
		$this->resp->result = true;
		$this->resp->params = \Yii::$app->user->getIdentity()->publicAttributes();
	

		return $this->resp;
	
	}

	public function actionUpdate()
	{
		$model = Users::findOne(['_id' => \Yii::$app->user->id]);
		$model->scenario = Users::SCENARIO_UPDATE;
		if($model && $model->load(\Yii::$app->request->bodyParams, '') && $model->save()) {
			
			$this->resp->result = true;
			$this->resp->params = $model->publicAttributes();
		}

		return $this->resp;
	}
}