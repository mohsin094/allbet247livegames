<?php
use \common\models\Settings;
class m230902_171710_settings_collection extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->createCollection('settings');
        $this->batchInsert('settings',[
            [
                'name' => Settings::NAME_WEBHOOK_URL,
                'value' => 'http://sample/webhook',
                'description' => 'Webhook Url'
            ],
            [
                'name' => Settings::NAME_SHARE_PERCENT,
                'value' => '30',
                'description' => 'The amount of money deducted from each game and adds to site\'s bank'
            ],
            
        ]);
    }

    public function down()
    {
        echo "m230902_171710_settings_collection cannot be reverted.\n";

        return false;
    }
}
