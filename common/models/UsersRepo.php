<?php
namespace common\models;

use \common\components\Tools;
use \common\models\FinancialTransactions;
class UsersRepo extends \common\models\Users
{
	public function increaseBalance($amount, $source, $sourceId, $description, $type = FinancialTransactions::TYPE_INCREASE, $operatorId = null)
	{
		try {
			$this->balance += (string)$amount;
			if(!$this->save()) {
				\Yii::error($this->getErrors());
				throw new \Exception('saving user balance error');
			}else {

				FinancialTransactions::new((string)$this->_id, $amount, $type, $source, $sourceId, $description, $operatorId);
			}
			return $this;

		}catch(\Throwable $e) {
			\Yii::error('increase balance UsersRepo failed:'.$e->getMessage());
			return false;
		}
	}

	public function decreaseBalance($amount, $source, $sourceId, $description, $type = FinancialTransactions::TYPE_DECREASE, $operatorId = null)
	{

		try {
			$this->balance -= (string)$amount;
			if(!$this->save()) {
				\Yii::error($this->getErrors());
				throw new \Exception('saving user balance error');
			}else {
				FinancialTransactions::new((string)$this->_id, $amount, $type, $source, $sourceId, $description, $operatorId);
			}
			return $this;

		}catch(\Throwable $e) {
			\Yii::error('decrease balance UsersRepo failed:'.$e->getMessage());
			return false;
		}
	}

	public function enoughBalance($amount)
	{
		if($this->balance >= $amount)
			return true;
		else
			return false;
	}

	public function getInvitationId()
	{
		if($this->invitation_id == '') {
			$this->invitation_id = self::generateInvitationId();
			$this->save();
		}

		return $this->invitation_id;
	}
}