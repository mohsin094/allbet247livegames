<?php

class m230902_171710_settings_collection extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->createCollection('settings');
    }

    public function down()
    {
        echo "m230902_171710_settings_collection cannot be reverted.\n";

        return false;
    }
}
