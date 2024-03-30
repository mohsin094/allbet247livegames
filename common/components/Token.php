<?php


namespace common\components;


use common\models\Tokens;

class Token
{
    const TYPE_ALPHA_NUMERIC = 'alpha_numeric';
    const TYPE_NUMERIC = 'numeric';
    const TYPE_ALPHABETIC = 'alphabetic';

    public $length = 32;
    public $type = self::TYPE_ALPHA_NUMERIC;
    public $expiration = 24 * 60 * 60;
    public $name;
    public $token;
    public $userId = null;

    private static $matchChar = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ];
    private static $matchNumber = [
        '0','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6',
        '0','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6'
    ];

    public function length($length)
    {
        $this->length = $length;
        return $this;
    }

    public function type($type)
    {
        $this->type = $type;
        return $this;
    }

    public function name($name)
    {
        $this->name = $name;
        return $this;
    }


    /*
     * param $exp format: hh LIKE 8h
     */
    public function exp($exp)
    {
        if(strpos($exp, 'h') !== false) {
            $this->expiration = time() + ((int) trim($exp, 'h')) * 60 * 60;
        }elseif(strpos($exp, 'm') !== false) {
            $this->expiration = time() + ((int) trim($exp, 'm')) * 60;
        }
        return $this;
    }

    public function userId($userId)
    {
        $this->userId = $userId;
        return $this;
    }

    public function prepare()
    {
        if($this->type == self::TYPE_ALPHA_NUMERIC) {
            $this->token = \Yii::$app->getSecurity()->generateRandomString($this->length);
        }elseif($this->type == self::TYPE_ALPHABETIC) {
            $this->token = str_replace(self::$matchNumber, self::$matchChar, \Yii::$app->getSecurity()->generateRandomString($this->length));
            $this->token = str_replace(['-','_'],'a', $this->token);
        }elseif($this->type == self::TYPE_NUMERIC) {
            $this->token = str_replace(self::$matchChar, self::$matchNumber, \Yii::$app->getSecurity()->generateRandomString($this->length));
            $this->token = str_replace(['-','_'],'8', $this->token);
        }
    }

    public function getCode()
    {
        $this->prepare();
        return $this->token;
    }

    public function generate()
    {
        $this->prepare();

        $token = new Tokens;
        $token->type = $this->name;
        $token->user_id = $this->userId;
        $token->exp = (string) $this->expiration;
        $token->token = $this->token;
        if($token->save())
            return $token;
    }
}