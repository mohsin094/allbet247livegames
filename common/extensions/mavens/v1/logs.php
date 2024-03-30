<?php 
namespace common\extensions\mavens\v1;


use common\components\Tools;
use common\extensions\mavens\Mavens;
use common\modules\user\models\Users;
use common\models\Settings;
use yii\helpers\Url;
use common\modules\stats\components\File;

class logs extends MavensV1
{
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

    //here the log for hands each 1 min


	public function getHandHistories($date = null,$name = null)
    {
        if(empty($date)){
            $date = date("Y-m-d");
        }
        \Yii::$app->mavens->apiVersion = null;
        $tables = $this->getTables($date);
        $file = \Yii::getAlias('@webroot/files/hand-history');
        file_put_contents($file, "");
        if(!empty($tables)){
             foreach ($tables as $table) {
                $params = array("Command" => "LogsHandHistory","Date" => $date,"Name" => $table['tableName']);
                $data = $this->request()->sendData($params,__CLASS__,__METHOD__,false);
                $content = file_put_contents($file, $data,FILE_APPEND);
                file_put_contents($file, "\n",FILE_APPEND);
            }
            //change responsed data to lagacy mode
            \Yii::$app->mavens->apiVersion = Settings::getSettingValue(Settings::NAME_MAVENS_API_VERSION);
            return file_get_contents($file);
        }else{
            \Yii::$app->mavens->apiVersion = Settings::getSettingValue(Settings::NAME_MAVENS_API_VERSION);
            return false;
        }
    }

    public function getRingGames()
    {
        $params = array("Command" => "RingGamesList", "Fields" => "Name,Game,RakePercent,Status,Seats");
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,false); 
        return json_decode($api);
    }

    public function getTables($date = null)
    {
        if(empty($date)){
            $date = date("Y-m-d");
        }
        $params = array("Command" => "LogsHandHistory","Date" => $date);
        $api = $this->request()->sendData($params,__CLASS__,__METHOD__,false);
        $paramlist = Explode("\r\n", $api);
        foreach ($paramlist as $param)
        {
            $namevalue = Explode("=", $param, 2);
            $result[$namevalue[0]] = $namevalue[1]; 
        }   
        $tables = [];
        $i = 1;
        foreach ($result as $key => $value) {
           if($i <= $result['Files']){
             if($result['Date'.$i] == $date){
                array_push($tables, [
                    'tableName' => $result['Name'.$i]
                ]);
            }
            $i++;
           }
        }
        return $tables;
    }      
}
