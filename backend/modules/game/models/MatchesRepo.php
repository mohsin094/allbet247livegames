<?php
namespace backend\modules\game\models;

use common\models\UsersRepo;
use common\models\GameStakes;
class MatchesRepo extends backend\modules\game\models\Matches
{

    public function createNewMatch()
    {
		$user = UsersRepo::findOne(['_id' => $this->home_id]);
		$stake = GameStakes::findOne(['_id' => $this->stake_id]);

		if($user->enoughBalance($this->amount)) {
	    	if($this->save()) {
	    		$user->decreaseBalance($stake->stake, self::class, (string) $this->_id, \Yii::t('app', 'Decrease Balance For Creating a Match'));
	    	}

		}else {
			$this->addError('stake_id', \Yii::t('app', 'Low Balance'));
		}
    }
}