<?php
namespace common\models;

use common\models\FinancialTransactions;
class UsersRepo extends common\models\Users
{
	public function increaseBalance()
	{
		try {
			$this->balance += $amount;
			if(!$this->save()) {
				throw new \Exception($this->getErrorSummary(true));
			}else {
				FinancialTransactions::new((string)$this->_id, $amount, FinancialTransactions::TYPE_DECREASE, $source, $sourceId, $description);
			}

			return $this;

		}catch(\Throwable $e) {
			\Yii::error('decrease balance UsersRepo failed:'.$e->getMessage());
			return false;
		}
	}

	public function decreaseBalance($amount, $source, $sourceId, $description)
	{
		try {
			$this->balance -= $amount;
			if(!$this->save()) {
				throw new \Exception($this->getErrorSummary(true));
			}else {
				FinancialTransactions::new((string)$this->_id, $amount, FinancialTransactions::TYPE_DECREASE, $source, $sourceId, $description);
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
}