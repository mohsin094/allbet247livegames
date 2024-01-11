<?php
namespace common\extensions\mavens;

use common\components\Tools;

class Mavens
{
    const VERSION_1 = '1.0.0';

    public $version;

    public function version()
    {
        return $this->version;
    }

    public function request()
    {
        $request = new Request();
        return $request;
    }

    public function response($response)
    {
        $obj = new \stdClass();
        if(!empty($response)){
            if ($response->Result == "Ok"){
                $obj->success = true;
            }else{
                $obj->success = false;
            }
            $obj->params = $response;

        }else{
            $obj->success = false;
            $obj->params->Error = 'Connection failed';
        }
        return $obj;
    }

}