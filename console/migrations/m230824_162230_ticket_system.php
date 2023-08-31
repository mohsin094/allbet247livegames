<?php

class m230824_162230_ticket_system extends \yii\mongodb\Migration
{
    public function up()
    {

        $this->createCollection('tickets');
        $this->createCollection('ticket_messages');
    }

    public function down()
    {
        echo "m230824_162230_ticket_system cannot be reverted.\n";

        return false;
    }
}
