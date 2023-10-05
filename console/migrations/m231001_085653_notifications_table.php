<?php

class m231001_085653_notifications_table extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->createCollection('notifications');
    }

    public function down()
    {
        echo "m231001_085653_notifications_table cannot be reverted.\n";

        return false;
    }
}
