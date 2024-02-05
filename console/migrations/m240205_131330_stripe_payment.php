<?php
use \common\models\Settings;
class m240205_131330_stripe_payment extends \yii\mongodb\Migration
{
    public function up()
    {
    	$this->batchInsert('settings',[
            [
                'name' => Settings::NAME_STRIPE_API_KEY,
                'value' => '',
                'description' => 'stripe api key'
            ]
        ]);
    }

    public function down()
    {
        echo "m240205_131330_stripe_payment cannot be reverted.\n";

        return false;
    }
}
