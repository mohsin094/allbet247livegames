<?php

namespace backend\modules\game\models;

use yii\base\Model;

class GameForm extends Form
{
	// public $home_id;
	public $round_id;
	public $stake_id;
	public $timeframe_id;

	public function rules()
	{
		return [
			[['round_id', 'stake_id', 'timeframe_id', 'user_id'], 'required'],
			[['round_id', 'stake_id', 'timeframe_id', 'user_id'], 'string'],
		];
	}


}