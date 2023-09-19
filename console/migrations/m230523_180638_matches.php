<?php

class m230523_180638_matches extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->createCollection('matches');
    }

    public function down()
    {
        return false;
    }
}
