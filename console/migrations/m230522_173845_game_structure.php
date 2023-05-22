<?php

use backend\modules\game\models\GameTimeframes;
use backend\modules\game\models\GameRounds;
use backend\modules\game\models\GameStakes;


class m230522_173845_game_structure extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->createCollection('game_timeframes');
        $this->batchInsert('game_timeframes',[
            [
                'timeframe' => GameTimeframes::TIMEFRAME_SLOW
            ],
            [
                'timeframe' => GameTimeframes::TIMEFRAME_FAST
            ],
            [
                'timeframe' => GameTimeframes::TIMEFRAME_NORMAL
            ],
        ]);

        $this->createCollection('game_stakes');
        $this->batchInsert('game_stakes',[
            [
                'stake' => '0.5'
            ],
            [
                'stake' => '1'
            ],
            [
                'stake' => '3'
            ],
            [
                'stake' => '5'
            ],
            [
                'stake' => '15'
            ],
            [
                'stake' => '25'
            ],
            [
                'stake' => '50'
            ],
            [
                'stake' => '75'
            ],
            [
                'stake' => '100'
            ],

        ]);
        $this->createCollection('game_rounds');
        $this->batchInsert('game_rounds',[
            [
                'round' => 1
            ],
            [
                'round' => 3
            ],
            [
                'round' => 5
            ],
            [
                'round' => 7
            ],
            
        ]);

    }

    public function down()
    {
        echo "m230522_173845_game_structure cannot be reverted.\n";

        return false;
    }
}
