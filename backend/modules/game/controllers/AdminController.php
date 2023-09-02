<?php
namespace backend\modules\game\controllers;

use app\modules\game\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;

use \backend\modules\game\models\GameStakes;

class AdminController extends AdminApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['get-stakes-list', 'add-stake', 'delete-stake'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
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
			$this->resp->params = $model->attributes;
		}

		return $this->resp;
	}

	public function actionGetStakesList()
	{
		$this->resp->result = true;
		$this->resp->params = GameStakes::find()->asArray()->all();

		return $this->resp;
	}
}