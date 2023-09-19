<?php

namespace common\components;
class ApiAction {
	const ACTION_REDIRECT = 'redirect';

	const REDIRECT_TYPE_SOFT = 'soft';
	const REDIRECT_TYPE_HARD = 'hard';

	public $action = '';
	public $params = [];

	public function __construct($params)
	{
		$this->action = $params[0];

		if(isset($params[1]))
			$this->params = $params[1];
	}

	public function get()
	{
		return [
			'action' => $this->action,
			'params' => $this->params
		];
	}

	public static function build($params)
	{
		return (new static($params));
	}	
}
