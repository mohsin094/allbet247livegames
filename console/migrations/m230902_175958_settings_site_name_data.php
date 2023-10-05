<?php

use \common\models\Settings;
class m230902_175958_settings_site_name_data extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->batchInsert('settings',[
            [
                'name' => Settings::NAME_SITE_NAME,
                'value' => 'Backgammon',
                'description' => 'Public Name of Website'
            ],
            
        ]);
    }

    public function down()
    {
        echo "m230902_175958_settings_site_name_data cannot be reverted.\n";

        return false;
    }
}
