<?php


namespace common\extensions\mavens\v1;


use common\components\Tools;
use common\extensions\mavens\Mavens;
use common\modules\user\models\Users;
use yii\helpers\Url;

class account extends MavensV1
{
    
    public function addNew($user)
    {
        $params = [
            "Player"   => $user->public_name,
            "RealName" => $user->public_name,
            "PW"       => $user->password,
            "Location" => self::ATTR_USER_LOCATION,
            "Email"    => $user->email,
            "Avatar"   => self::ATTR_USER_AVATAR,
            "Gender"   => self::ATTR_USER_GENDER,
            "Chat"     => self::ATTR_USER_CHAT,
            "Note"     => self::ATTR_USER_NOTE
        ];
        $params["Command"] = "AccountsAdd";
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,true);
        $response = $this->response($api);
        return $response;
    }

    public function getSessionKey($player)
    {
        $params = ["Command" => "AccountsSessionKey", "Player" => $player];
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,true);
        $response = $this->response($api);
        if($response->success){
            $key = $api->SessionKey;
            return $key;
        }
    }

    public function mavensUrl($player)
    {
        $key = $this->getSessionKey($player);
        $src =  \Yii::$app->mavens->serverUrl . "/?LoginName=" . $player . "&SessionKey=" . $key;

        return $src;
    }

    public function login($player,$password)
    {
        $params = ["Command" => "AccountsPassword","Player" => $player,"PW" => $password];
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,true);
        $response = $this->response($api);
        if($response->success){
            return $this->mavensUrl($player);
        }else{
            return $response;
        }
    }

    public function logout($player)
    {
        $response = $this->get($player);
        if($response->success){
            if(!empty($response->params->SessionID))
            {
                $params = ["Command" => "ConnectionsTerminate","SessionID" => $response->params->SessionID];
                $api = $this->request()->sendData($params,__CLASS__,__METHOD__,true);
                $this->response($api);
            }
        }
        return $response;
    }

    public function edit($player,$params)
    {
        $params['Player'] = $player;
        $params["Command"] = "AccountsEdit";
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,true);
        $response = $this->response($api);
        return $response;
    }

    public function get($palyer)
    {
        $params = ["Command" => "AccountsGet","Player" => $palyer ];
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,true);
        $response = $this->response($api);
        return $response;
    }

    public function incBalance($player,$amount)
    {
        //increase player balance
        $params = ["Command" => "AccountsIncBalance","Player" => $player,"Amount" => $amount];
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,true);
        $response = $this->response($api);
        return $response;
    }

    public function decBalance($player,$amount)
    {
        //decrease player balance
        $params = ["Command" => "AccountsDecBalance","Player" => $player,"amount" => $amount];
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,true);
        $response = $this->response($api);
        return $response;
    }

}