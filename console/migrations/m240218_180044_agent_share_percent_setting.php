<?php
use \common\models\Settings;
class m240218_180044_agent_share_percent_setting extends \yii\mongodb\Migration
{
    public function up()
    {
		$this->batchInsert('settings',[
            [
                'name' => Settings::NAME_AGENT_SHARE_PERCENT,
                'value' => '2',
                'description' => 'The amount of money deducted from each revenue share of a game and adds to agent\'s balance'
            ]
            
        ]);
    }

    public function down()
    {
        echo "m240218_180044_agent_share_percent_setting cannot be reverted.\n";

        return false;
    }
}
