<?php
namespace backend\modules\financial\controllers;

use app\modules\financial\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use MongoDB\BSON\ObjectId;
use common\models\UsersRepo;

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
                        'actions' => ['deposit-into-account', 'withdrawal-from-account'],
                        'roles' => ['admin', 'agent'],
                        'allow' => true
                    ],
                    [
                        'actions' => ['list', 'get-income', 'get-agent-activity-amount'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

    public function actionGetAgentActivityAmount()
    {
        $monthly = FinancialTransactions::find()
        ->with(['operator'])
        ->where(['!=', 'operator_id', null])
        ->andWhere(['>', 'cdate', (string) strtotime('first day of ' . date( 'F Y'))])
        ->all();

        $weekly = FinancialTransactions::find()
        ->where(['!=', 'operator_id', null])
        ->andWhere(['>', 'cdate', (string) strtotime('this week')])
        ->all();

        $daily = FinancialTransactions::find()
        ->where(['!=', 'operator_id', null])
        ->andWhere(['>', 'cdate', (string) strtotime('today')])
        ->all();

        $result = [
            'monthly' => [],
            'weekly' => []
        ];

        foreach($monthly as $m) {
            if(!in_array((string) $m->operator_id, array_keys($result['monthly']))) {
                $result['monthly'][(string) $m->operator_id] = [
                    'deposit' => 0,
                    'withdrawal' => 0,
                    'operator' => $m->operator
                ];
            }

            if($m->type == FinancialTransactions::TYPE_DEPOSIT) {
                $result['monthly'][(string) $m->operator_id]['deposit'] += $m->amount;
            }

            if($m->type == FinancialTransactions::TYPE_WITHDRAWAL) {
                $result['monthly'][(string) $m->operator_id]['withdrawal'] += $m->amount;
            }
        }

        foreach($weekly as $m) {
            if(!in_array((string) $m->operator_id, array_keys($result['weekly']))) {
                $result['weekly'][(string) $m->operator_id] = [
                    'deposit' => 0,
                    'withdrawal' => 0,
                    'operator' => $m->operator
                ];
            }

            if($m->type == FinancialTransactions::TYPE_DEPOSIT) {
                $result['weekly'][(string) $m->operator_id]['deposit'] += $m->amount;
            }

            if($m->type == FinancialTransactions::TYPE_WITHDRAWAL) {
                $result['weekly'][(string) $m->operator_id]['withdrawal'] += $m->amount;
            }
        }

        foreach($daily as $m) {
            if(!in_array((string) $m->operator_id, array_keys($result['daily']))) {
                $result['daily'][(string) $m->operator_id] = [
                    'deposit' => 0,
                    'withdrawal' => 0,
                    'operator' => $m->operator
                ];
            }

            if($m->type == FinancialTransactions::TYPE_DEPOSIT) {
                $result['daily'][(string) $m->operator_id]['deposit'] += $m->amount;
            }

            if($m->type == FinancialTransactions::TYPE_WITHDRAWAL) {
                $result['daily'][(string) $m->operator_id]['withdrawal'] += $m->amount;
            }
        }

        $this->resp->result = true;
        $this->resp->params = $result;

        return $this->resp;
    }

    public function actionDepositIntoAccount($userId, $amount)
    {
        
        $userRepo = UsersRepo::findOne(['_id' => $userId]);
        $userRepo->increaseBalance($amount, self::class, null, 'Deposit By Agent', FinancialTransactions::TYPE_DEPOSIT, \Yii::$app->user->id);

        $this->resp->result = true;

        return $this->resp;
    }

    public function actionWithdrawalFromAccount($userId, $amount)
    {
        

        $userRepo = UsersRepo::findOne(['_id' => $userId]);
        $userRepo->decreaseBalance($amount, self::class, null, 'Withdraw By Agent', FinancialTransactions::TYPE_WITHDRAWAL, \Yii::$app->user->id);

        $this->resp->result = true;

        return $this->resp;
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
        ->with(['user', 'operator'])
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