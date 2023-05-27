<?php

class m230527_163539_financial_transactions_table extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->createCollection('financial_transactions');
    }

    public function down()
    {
        echo "m230527_163539_financial_transactions_table cannot be reverted.\n";

        return false;
    }
}
