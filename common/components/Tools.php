<?php
/**
 * Created by CodePlaya production.
 * Copyright 2019 © by CodePlaya.com
 * Contact us at codeplaya.com@gmail.com
 * Live Support on Skype: CodePlaya dotCom
 * Website: http://codeplaya.com
 * Date: 7/7/19
 * Time: 5:11 AM
 */

namespace common\components;
use \Yii;
use yii\helpers\VarDumper;

class Tools
{

    public static function debug($input, $haltAfter = false)
    {
        VarDumper::dump($input, 10, true);
        if($haltAfter)
            Yii::$app->end();
    }



}