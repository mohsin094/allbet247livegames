<?php

class m240111_083711_mavens_settings extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->batchInsert('settings',[
            [
                'name' => Settings::NAME_MAVENS_API_URL,
                'value' => '',
                'description' => 'poker mavens api url'
            ],
            [
                'name' => Settings::NAME_MAVENS_SERVER_URL,
                'value' => '',
                'description' => 'poker mavens server url'
            ],
            [
                'name' => Settings::NAME_MAVENS_API_PASSWORD,
                'value' => '',
                'description' => 'poker mavens api password'
            ],
            [
                'name' => Settings::NAME_MAVENS_API_VERSION,
                'value' => '',
                'description' => 'poker mavens api version'
            ],
            [
                'name' => Settings::NAME_MAVENS_CALLBACK_PASSWORD,
                'value' => '',
                'description' => 'poker mavens callback password'
            ]
            
        ]);
    }

    public function down()
    {
        echo "m240111_083711_mavens_settings cannot be reverted.\n";

        return false;
    }
}
