<?php

class m230824_163002_announcements_table extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->createCollection('announcements');
    }

    public function down()
    {
        echo "m230824_163002_announcements_table cannot be reverted.\n";

        return false;
    }
}
