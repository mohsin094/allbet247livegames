<?php
namespace backend\modules\game\controllers;

use app\modules\game\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;

use \backend\modules\game\models\GameStakes;
use \backend\modules\game\models\Matches;

class AdminController extends AdminApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get-stakes-list', 'add-stake', 'delete-stake',
                        'matches-list', 'match-status-list'],
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
		$this->resp->params = Matches::find()
		->with(['homeUser', 'awayUser','round', 'stake', 'timeframe'])
		->orderBy('cdate DESC')
		->asArray()
		->all();


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