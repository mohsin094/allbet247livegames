<?php
/**
 * Created by CodePlaya production.
 * Copyright 2019 © by CodePlaya.com
 * Contact us at codeplaya.com@gmail.com
 * Live Support on Skype: CodePlaya dotCom
 * Website: http://codeplaya.com
 * Date: 7/24/19
 * Time: 6:42 PM
 */

namespace app\components;


use yii\helpers\Html;

class Image
{
    public $title = null;
    public $path = null;
    public $base64 = null;
    public $model = null;

    private $_base64 = null;

    public function __construct($path, $model= null, $title = null)
    {
        $this->title = $title;
        $this->path = $path;
        $this->model = $model;

        return $this;
    }


    public function asImgTag($options = [], $base64 = true)
    {
        return Html::img(($base64) ? $this->asBase64() : $this->path, $options);
    }


    public function __get($name)
    {
        if(isset($this->{$name}))
            return $this->{$name};
        else
            return $this->model->{$name};
    }

    public function __set($name, $value)
    {
        $this->model->{$name} = $value;
    }

    public function asBase64()
    {
        if($this->_base64 === null) {
            $type = pathinfo($this->path, PATHINFO_EXTENSION);
            $data = file_get_contents($this->path);
            $this->_base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        }


        return $this->_base64;
    }
}