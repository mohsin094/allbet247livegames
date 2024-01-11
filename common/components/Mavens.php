<?php


namespace common\components;

use common\models\Settings;
use yii\base\Component;

class Mavens extends Component
{
    public $apiUrl;
    public $serverUrl;
    public $apiPassword;
    public $apiVersion;
    public $version;

    public $callbackPassword;

    public function init()
    {
        $this->apiPassword = Settings::getSettingValue(Settings::NAME_MAVENS_API_PASSWORD);
        $this->apiUrl = Settings::getSettingValue(Settings::NAME_MAVENS_API_URL);
        $this->serverUrl = Settings::getSettingValue(Settings::NAME_MAVENS_SERVER_URL);
        $this->apiVersion = Settings::getSettingValue(Settings::NAME_MAVENS_API_VERSION);
        $this->version = \app\extensions\mavens\Mavens::VERSION_1;
        $this->callbackPassword = Settings::getSettingValue(Settings::NAME_MAVENS_CALLBACK_PASSWORD);
        return parent::init();
    }

    public function __get($name)
    {
        $version = explode('.',$this->version);
        $version = 'v'.$version[0];
        $class = "common\\extensions\mavens\\".$version."\\".$name;
        $mavens = new $class;
        return $mavens;
    }
}