<?php
namespace backend\modules\financial\controllers;

use app\modules\financial\components\AdminApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use MongoDB\BSON\ObjectId;
use common\models\UsersRepo;
use backend\modules\user\models\UserSubsets;
use \common\models\UserRoles;
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
                        'actions' => ['list', 'deposit-into-account', 'withdrawal-from-account','get-agent-activity-revenue', 'get-agent-activity-amount','get-agent-activity-revenue-by-date', 'get-agent-activity-amount-by-date'],
                        'roles' => ['admin', 'agent'],
                        'allow' => true
                    ],
                    [
                        'actions' => ['get-income', 'get-agent-transactions', 'get-agent-transactions-by-date'],
                        'roles' => ['admin'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

    public function actionGetAgentActivityRevenue()
    {
        $monthly = FinancialTransactions::find()
        ->with(['user'])
        ->where(['type' => FinancialTransactions::TYPE_AGENT_REVENUE_SHARE])
        ->andWhere(['>', 'cdate', strtotime('first day of ' . date( 'F Y'))]);
        
        if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
            $monthly->andWhere(['user_id' => \Yii::$app->user->id]);
        }
        $monthly = $monthly->all();

        $weekly = FinancialTransactions::find()
        ->with(['user'])
        ->where(['type' => FinancialTransactions::TYPE_AGENT_REVENUE_SHARE])
        ->andWhere(['>', 'cdate', strtotime('this week')]);
        
        if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
            $weekly->andWhere(['user_id' => \Yii::$app->user->id]);
        }
        $weekly = $weekly->all();

        $daily = FinancialTransactions::find()
        ->with(['user'])
        ->where(['type' => FinancialTransactions::TYPE_AGENT_REVENUE_SHARE])
        ->andWhere(['>', 'cdate', strtotime('today')]);

        if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
            $daily->andWhere(['user_id' => \Yii::$app->user->id]);
        }
        $daily = $daily->all();



        $result = [
            'daily' => [],
            'monthly' => [],
            'weekly' => [],
        ];

        foreach($monthly as $m) {
            if(!in_array((string) $m->user_id, array_keys($result['monthly']))) {
                $result['monthly'][(string) $m->user_id] = [
                    'totalRevenue' => 0,
                    'user' => $m->user
                ];
            }

            if($m->type == FinancialTransactions::TYPE_AGENT_REVENUE_SHARE) {
                $result['monthly'][(string) $m->user_id]['totalRevenue'] += $m->amount;
            }
            
        }

        foreach($weekly as $m) {
            if(!in_array((string) $m->user_id, array_keys($result['weekly']))) {
                $result['weekly'][(string) $m->user_id] = [
                    'totalRevenue' => 0,
                    'user' => $m->user
                ];
            }

            if($m->type == FinancialTransactions::TYPE_AGENT_REVENUE_SHARE) {
                $result['weekly'][(string) $m->user_id]['totalRevenue'] += $m->amount;
            }

        }

        foreach($daily as $m) {
            if(!in_array((string) $m->user_id, array_keys($result['daily']))) {
                $result['daily'][(string) $m->user_id] = [
                    'totalRevenue' => 0,
                    'user' => $m->user
                ];
            }

            if($m->type == FinancialTransactions::TYPE_AGENT_REVENUE_SHARE) {
                $result['daily'][(string) $m->user_id]['totalRevenue'] += $m->amount;
            }

         
        }

        $this->resp->result = true;
        $this->resp->params = $result;

        return $this->resp;
    }

    public function actionGetAgentActivityRevenueByDate($date, $toDate)
    {
        $daily = FinancialTransactions::find()
        ->with(['user'])
        ->where(['type' => FinancialTransactions::TYPE_AGENT_REVENUE_SHARE])
        ->andWhere(['>', 'cdate', strtotime($date)])
        ->andWhere(['<', 'cdate', (string) (strtotime($toDate))]);

        if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
            $daily->andWhere(['user_id' => \Yii::$app->user->id]);
        }
        $daily = $daily->all();



        $result = [

        ];


        foreach($daily as $m) {
            if(!in_array((string) $m->user_id, array_keys($result))) {
                $result[(string) $m->user_id] = [
                    'totalRevenue' => 0,
                    'user' => $m->user
                ];
            }

            if($m->type == FinancialTransactions::TYPE_AGENT_REVENUE_SHARE) {
                $result[(string) $m->user_id]['totalRevenue'] += $m->amount;
            }

         
        }

        $this->resp->result = true;
        $this->resp->params = $result;

        return $this->resp;
    }

    public function actionGetAgentTransactionsByDate($agentId, $date, $toDate)
    {

        $daily = FinancialTransactions::find()
        ->where(['user_id' => $agentId])
        ->andWhere(['type' => FinancialTransactions::TYPE_AGENT_REVENUE_SHARE])
        ->andWhere(['>', 'cdate', strtotime($date)])
        ->andWhere(['<', 'cdate', (string) (strtotime($toDate))])
        ->all();



        $result = [
                    'totalRevenue' => 0,
                    'transactions' => [],
                    
        ];

        foreach($daily as $m) {


            if($m->type == FinancialTransactions::TYPE_AGENT_REVENUE_SHARE) {
                $result['totalRevenue'] += $m->amount;
            }

            array_push($result['transactions'], $m);
        }

        $this->resp->result = true;
        $this->resp->params = $result;

        return $this->resp;
    }

    public function actionGetAgentTransactions($agentId)
    {
        $monthly = FinancialTransactions::find()
        ->where(['user_id' => $agentId])
        ->andWhere(['type' => FinancialTransactions::TYPE_AGENT_REVENUE_SHARE])
        ->andWhere(['>', 'cdate', strtotime('first day of ' . date( 'F Y'))])
        ->all();

        $weekly = FinancialTransactions::find()
        ->where(['user_id' => $agentId])
        ->andWhere(['type' => FinancialTransactions::TYPE_AGENT_REVENUE_SHARE])
        ->andWhere(['>', 'cdate', strtotime('this week')])
        ->all();

        $daily = FinancialTransactions::find()
        ->where(['user_id' => $agentId])
        ->andWhere(['type' => FinancialTransactions::TYPE_AGENT_REVENUE_SHARE])
        ->andWhere(['>', 'cdate', strtotime('today')])
        ->all();



        $result = [
            'daily' => [
                    'totalRevenue' => 0,
                    'transactions' => [],
                    
                ],
            'monthly' => [
                    'totalRevenue' => 0,
                    'transactions' => [],
                    
                ],
            'weekly' => [
                    'totalRevenue' => 0,
                    'transactions' => [],
                    
                ],
        ];

        foreach($monthly as $m) {


            if($m->type == FinancialTransactions::TYPE_AGENT_REVENUE_SHARE) {
                $result['monthly']['totalRevenue'] += $m->amount;
            }

            array_push($result['monthly']['transactions'], $m);

            
        }

        foreach($weekly as $m) {

            if($m->type == FinancialTransactions::TYPE_AGENT_REVENUE_SHARE) {
                $result['weekly']['totalRevenue'] += $m->amount;
            }

            array_push($result['weekly']['transactions'], $m);
        }

        foreach($daily as $m) {


            if($m->type == FinancialTransactions::TYPE_AGENT_REVENUE_SHARE) {
                $result['daily']['totalRevenue'] += $m->amount;
            }

            array_push($result['daily']['transactions'], $m);
        }

        $this->resp->result = true;
        $this->resp->params = $result;

        return $this->resp;
    }

    public function actionGetAgentActivityAmountByDate($date, $toDate)
    {

        $daily = FinancialTransactions::find()
        ->with(['operator'])
        ->where(['!=', 'operator_id', null])
        ->andWhere(['<', 'cdate', (string) (strtotime($toDate))])
        ->andWhere(['>', 'cdate', (string) strtotime($date)]);


        if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
            $daily->andWhere(['operator_id' => \Yii::$app->user->id]);
        } 
        $daily = $daily->all();



        $result = [

        ];

        foreach($daily as $m) {
            if(!in_array((string) $m->operator_id, array_keys($result))) {
                $result[(string) $m->operator_id] = [
                    'deposit' => 0,
                    'withdrawal' => 0,
                    'operator' => $m->operator
                ];
            }

            if($m->type == FinancialTransactions::TYPE_DEPOSIT) {
                $result[(string) $m->operator_id]['deposit'] += $m->amount;
            }

            if($m->type == FinancialTransactions::TYPE_WITHDRAWAL) {
                $result[(string) $m->operator_id]['withdrawal'] += $m->amount;
            }
        }

        $this->resp->result = true;
        $this->resp->params = $result;

        return $this->resp;
    }

    public function actionGetAgentActivityAmount()
    {
        $monthly = FinancialTransactions::find()
        ->with(['operator'])
        ->where(['!=', 'operator_id', null])
        ->andWhere(['>', 'cdate', (string) strtotime('first day of ' . date( 'F Y'))]);
         
        if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
            $monthly->andWhere(['operator_id' => \Yii::$app->user->id]);
        }
        $monthly = $monthly->all();

        $weekly = FinancialTransactions::find()
        ->with(['operator'])
        ->where(['!=', 'operator_id', null])
        ->andWhere(['>', 'cdate', (string) strtotime('this week')]);
        
        if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
            $weekly->andWhere(['operator_id' => \Yii::$app->user->id]);
        } 
        $weekly = $weekly->all();

        $daily = FinancialTransactions::find()
        ->with(['operator'])
        ->where(['!=', 'operator_id', null])
        ->andWhere(['>', 'cdate', (string) strtotime('today')]);

        if(\Yii::$app->user->getIdentity()->role == UserRoles::ROLE_AGENT) {
            $daily->andWhere(['operator_id' => \Yii::$app->user->id]);
        } 
        $daily = $daily->all();



        $result = [
            'daily' => [],
            'monthly' => [],
            'weekly' => [],
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
                $period = strtotime('this week');
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

    public function actionList($limit=50, $page=1, $query = '', $date = '', $toDate = '')
    {
        $models = FinancialTransactions::find()
        ->with(['user', 'operator'])
        ->orderBy('cdate DESC')
        ->limit($limit)
        ->offset(($page-1) * $limit);

        if(!empty($date) && !empty($toDate)) {
            $models->andWhere(['>', 'cdate', (string) strtotime($date)]);
            $models->andWhere(['<', 'cdate', (string) (strtotime($toDate))]);
        }

        if(\Yii::$app->user->getIdentity()->role == 'agent') {
            $subsets = UserSubsets::find()
            ->where(['caller_id' => \Yii::$app->user->id])
            ->indexBy('user_id')
            ->asArray()
            ->all();
            $subsets = array_keys($subsets);

            $models->where(['in', 'user_id', $subsets])
            ->orWhere(['operator_id' => \Yii::$app->user->id]);
        }

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
                    || (isset($value['user_id']) && str_contains($value['user_id'], $query))
                    || (isset($value['user']) && str_contains($value['user']['email'], $query))
                    || (isset($value['user']) && str_contains($value['user']['public_name'], $query)));
            }));
        }

        $this->resp->result = true;
        $this->resp->params = $models;

        return $this->resp;
    }
}