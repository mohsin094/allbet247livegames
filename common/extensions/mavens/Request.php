<?php


namespace common\extensions\mavens;


use common\components\Tools;

class Request
{
    public $apiMethod;

    const JSON_METHOD_NAME = 'json';
    const LEGACY_METHOD_NAME = 'legacy';

    public function __construct()
    {

        //get from db
        if((float) \Yii::$app->mavens->apiVersion >= 4.2){
            $this->apiMethod = self::JSON_METHOD_NAME;
        }else{
            $this->apiMethod = self::LEGACY_METHOD_NAME;
        }
    }

    public function sendData($params,$class,$method,$prepare = null)
    {
        $url = \Yii::$app->mavens->apiUrl;  // API url
        $pw = \Yii::$app->mavens->apiPassword; // API password
        $params ['Password'] = $pw;
        if($this->apiMethod == self::JSON_METHOD_NAME){
            $params ['JSON'] = 'Yes';
        }
        if(!empty($url)){
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($params));
            curl_setopt($curl, CURLOPT_TIMEOUT, 30);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_VERBOSE, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            if($this->apiMethod == self::JSON_METHOD_NAME){
                $response = curl_exec($curl);
            }else{
                $response = trim(curl_exec($curl));
            }
            $cerror = "";
            if (curl_errno($curl)) $cerror = (object) array('Result' => 'Error', 'Error' => curl_error($curl));
            else if (empty($response)) $cerror = (object) array('Result' => 'Error', 'Error' => 'Connection failed');
            curl_close($curl);
            if(array_key_exists("PW",$params)){
                $params["PW"] = 'secure';
            }
            $attributes = [
                "class" => $class,
                "method" => $method,
                "request_url" => $url,
                "params" => json_encode($params),
                "response" => json_encode($response),
                "cdate" => (string) time()
            ];
            
            if(empty($cerror)){
                if($prepare){
                    $result = $this->prepareResult($response);
                    return $result;
                }else{
                    return $response;
                }
            }else{
                return $cerror;
            }
        }else{
            $cerror = (object) array('Result' => 'Error', 'Error' => 'Connection failed');
            return $cerror;
        }
    }

    public function prepareResult($response)
    {
        if($this->apiMethod == self::JSON_METHOD_NAME){
            $result = json_decode($response);
        }else{
            $paramlist = Explode("\r\n", $response);
            foreach ($paramlist as $param)
            {
                $namevalue = Explode("=", $param, 2);
                $api[$namevalue[0]] = $namevalue[1]; 
                $result = (object) $api;
            }
        }
        return $result;
    }
}