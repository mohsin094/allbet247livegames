<?php

namespace backend\modules\financial\controllers;

use backend\modules\announcement\components\ApiController;
use \common\components\Tools;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\models\FinancialTransactions;
use \common\models\UsersRepo;
/**
 * Default controller for the `financial` module
 */
class DefaultController extends ApiController
{
    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['list', 'transfer'],
                        'roles' => ['@'],
                        'allow' => true,
                    ]
                ],
            ]
        ]);
    }

    public function actionTransfer($from, $amount)
    {
        $userRepo = UsersRepo::findOne(['_id' => (string) \Yii::$app->user->id]);
        $player = \Yii::$app->mavens->account->get(\Yii::$app->user->getIdentity()->public_name);

        switch($from) {
            case 'poker':
            if($player->params->Balance >= $amount) {
                //decrease from poker
                $dec = \Yii::$app->mavens->account->decBalance(\Yii::$app->user->getIdentity()->public_name, $amount);
                if($dec->success) {
                    //increase into main account
                    $userRepo->increaseBalance($amount, self::class, null, 'Transfer from poker to main account, amount:'.$amount, FinancialTransactions::TYPE_TRANSFER);
                    $this->resp->result = true;
                }
            }
            break;
            case 'main':
            if(\Yii::$app->user->getIdentity()->balance >= $amount) {
                //decrease from main account
                $userRepo->decreaseBalance($amount, self::class, null, 'Transfer from main accout to poker, amount:'.$amount, FinancialTransactions::TYPE_TRANSFER);

                //increase into poker account
                \Yii::$app->mavens->account->incBalance(\Yii::$app->user->getIdentity()->public_name, $amount);
                $this->resp->result = true;

            }

            break;
        }

        return $this->resp;
    }

    public function actionList()
    {
        $models = FinancialTransactions::find()
        ->where(['user_id' => \Yii::$app->user->id])
        ->orderBy('cdate DESC')
        ->limit(20)
        // ->asArray()
        ->all();

        $this->resp->result = true;
        $this->resp->params = $models;

        return $this->resp;
    }
}
