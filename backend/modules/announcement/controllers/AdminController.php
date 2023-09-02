<?php
namespace backend\modules\announcement\controllers;

use app\modules\announcement\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;

use backend\modules\announcement\models\Announcements;

class AdminController extends AdminApiController
{

	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['list', 'delete', 'add', 'type-list'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionTypeList()
	{
		$this->resp->result = true;
		$this->resp->params = Announcements::typeLists();

		return $this->resp;
	}

	public function actionDelete($id)
	{
		$model = Announcements::findOne(['_id' => (string) $id]);
		if($model) {
			$model->delete();
			$this->resp->result = true;
		}
		

		return $this->resp;
	}

	public function actionAdd()
	{
		$model = new Announcements;

		if($model->load(\Yii::$app->request->bodyParams, '') && $model->save()) {
			$this->resp->result = true;
			$this->resp->params = $model->attributes;
		}

		return $this->resp;
	}

	public function actionList()
	{
		$this->resp->result = true;
		$this->resp->params = Announcements::find()->asArray()->all();

		return $this->resp;
	}
}