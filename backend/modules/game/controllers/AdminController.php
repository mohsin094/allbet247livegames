<?php
namespace backend\modules\game\controllers;

use app\modules\game\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use \common\models\UserRoles;
use \backend\modules\game\models\GameStakes;
use \backend\modules\game\models\Matches;
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
                		'actions' => ['matches-list', 'match-status-list'],
                		'roles' => ['admin', 'agent'],
                		'allow' => true,
                	],
                    [
                        'actions' => ['get-stakes-list', 'add-stake', 'delete-stake'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionMatchStatusList()
	{
		$this->resp->result = true;
		$this->resp->params = Matches::statusList();

		return $this->resp;
	}

	public function actionMatchesList()
	{
		$this->resp->result = true;
		$matches = Matches::find()
		->with(['homeUser', 'awayUser','round', 'stake', 'timeframe'])
		->orderBy('cdate DESC')
		->limit(100)
		->asArray();

		if(\Yii::$app->user->getIdentity()->role == 'agent') {
			$subsets = UserSubsets::find()
			->where(['caller_id' => \Yii::$app->user->id])
			->indexBy('user_id')
			->asArray()
			->all();
			$subsets = array_keys($subsets);

			$matches->where(['in', 'home_id', $subsets])
			->orWhere(['in', 'away_id', $subsets]);
		}


		$this->resp->params = $matches->all();


		return $this->resp;
	}

	public function actionDeleteStake($id)
	{
		$model = GameStakes::findOne(['_id' => (string) $id]);
		if($model) {
			$model->status = GameStakes::STATUS_INACTIVE;
			$model->save();
			$this->resp->result = true;
		}
		

		return $this->resp;
	}

	public function actionAddStake()
	{
		$model = new GameStakes;

		if($model->load(\Yii::$app->request->bodyParams, '') && $model->save()) {
			$this->resp->result = true;
			$this->resp->params = $model;
		}

		return $this->resp;
	}

	public function actionGetStakesList()
	{
		$this->resp->result = true;
		$this->resp->params = GameStakes::find()
		// ->asArray()
		->all();

		return $this->resp;
	}
}