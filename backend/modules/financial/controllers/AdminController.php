<?php
namespace backend\modules\financial\controllers;

use app\modules\financial\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use MongoDB\BSON\ObjectId;

use \common\models\FinancialTransactions;
class AdminController extends AdminApiController
{

	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['list', 'get-income'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

    public function actionGetIncome($period = 'monthly')
    {
        switch($period) {
            case 'monthly':
                $period = strtotime('first day of');
            break;
            case 'daily':
                $period = strtotime('today');
            break;
            case 'weekly':
                $period = strtotime('monday');
            break;
        }

        $models = FinancialTransactions::find()
        ->where(['type' => FinancialTransactions::TYPE_BANK])
        ->andWhere(['>', 'cdate', $period])
        ->all();

        $income = 0;
        foreach($models as $model) {
            $income += $model->amount;
        }

        $this->resp->result = true;
        $this->resp->params = $income;

        return $this->resp;
    }

    public function actionList($limit=50, $page=1, $query = '')
    {
        $models = FinancialTransactions::find()
        ->with(['user'])
        ->orderBy('cdate DESC')
        ->limit($limit)
        ->offset(($page-1) * $limit);

        if(!empty($query)) {
            // $models = $models->where(['_id' => $query]);
            // $models = $models->orWhere(['user_id' => $query]);
            // $models = $models->orWhere(['user.email' => $query]);
            // $models = $models->orWhere(['user.public_name' => ['$regex' => $query]]);
        }

        $models = $models
        ->asArray()
        ->all();
   
        if(!empty($query)) {
            $models = array_values(array_filter($models, function($value) use($query) {
                return ((str_contains((string)$value['_id'], $query))
                    || (str_contains($value['user_id'], $query))
                    || (str_contains($value['user']['email'], $query))
                    || (str_contains($value['user']['public_name'], $query)));
            }));
        }

        $this->resp->result = true;
        $this->resp->params = $models;

        return $this->resp;
    }
}