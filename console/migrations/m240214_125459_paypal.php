<?php
use \common\models\Settings;
class m240214_125459_paypal extends \yii\mongodb\Migration
{
    public function up()
    {
		$this->batchInsert('settings',[
            [
                'name' => Settings::NAME_PAYPAL_CLIENT_SECRET,
                'value' => '',
                'description' => 'paypal client secret'
            ],
            [
                'name' => Settings::NAME_PAYPAL_CLIENT_ID,
                'value' => '',
                'description' => 'paypal client ID'
            ],
        ]);
    }

    public function down()
    {
        echo "m240214_125459_paypal cannot be reverted.\n";

        return false;
    }
}
