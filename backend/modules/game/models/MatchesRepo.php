<?php
namespace backend\modules\game\models;

use \common\models\UsersRepo;
use \backend\modules\game\models\GameStakes;
use \backend\modules\game\models\MatchEventsRepo;
use \common\components\Tools;
class MatchesRepo extends \backend\modules\game\models\Matches
{
	public function cancel()
	{
		$user = UsersRepo::findOne(['_id' => $this->home_id]);
		$stake = GameStakes::findOne(['_id' => $this->stake_id]);
		
    	$this->status = Matches::STATUS_EXPIRED;
    	if($this->save()) {
    		$user->increaseBalance($stake->stake, self::class, (string) $this->_id, \Yii::t('app', 'Increase Balance For Canceling Match'));
	    		return $this;
    	}
	}

    public function createNewMatch()
    {
		$user = UsersRepo::findOne(['_id' => $this->home_id]);
		$stake = GameStakes::findOne(['_id' => $this->stake_id]);
		$round = GameRounds::findOne(['_id' => $this->round_id]);

		if($user->enoughBalance($stake->stake)) {
	    	if($this->save()) {
	    		for($i=0; $i<$round->round; $i++) {
	    			$event = new MatchEventsRepo;
	    			$event->match_id = (string) $this->_id;
	    			$event->save();
	    			
	    		}

	    		$user->decreaseBalance($stake->stake, self::class, (string) $this->_id, \Yii::t('app', 'Decrease Balance For Creating a Match'));
	    		return $this;
	    	}
		
		}else {
			$this->addError('stake_id', \Yii::t('app', 'Low Balance'));
		}

		return false;
    }
}