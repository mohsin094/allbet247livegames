<?php
namespace backend\modules\game\models;

use \common\models\UsersRepo;
use \backend\modules\game\models\GameStakes;
use \common\components\Tools;
class MatchesRepo extends \backend\modules\game\models\Matches
{

    public function createNewMatch()
    {
		$user = UsersRepo::findOne(['_id' => $this->home_id]);
		$stake = GameStakes::findOne(['_id' => $this->stake_id]);
		$round = GameRounds::findOne(['round' => 1]);

		//limit to 1 round for now, will be removed in future
		$this->round_id = (string) $round->_id;


		if($user->enoughBalance($stake->stake)) {
	    	if($this->save()) {
	    		$user->decreaseBalance($stake->stake, self::class, (string) $this->_id, \Yii::t('app', 'Decrease Balance For Creating a Match'));
	    		return $this;
	    	}
		
		}else {
			$this->addError('stake_id', \Yii::t('app', 'Low Balance'));
		}

		return false;
    }
}