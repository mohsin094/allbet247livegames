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
            // [
            //     'timeframe' => GameTimeframes::TIMEFRAME_SLOW
            // ],
            // [
            //     'timeframe' => GameTimeframes::TIMEFRAME_FAST
            // ],
            [
                'timeframe' => GameTimeframes::TIMEFRAME_NORMAL
            ],
        ]);

        $this->createCollection('game_stakes');
        $this->batchInsert('game_stakes',[
            [
                'stake' => '0.5',
                'status' => GameStakes::STATUS_ACTIVE
            ],
            [
                'stake' => '1',
                'status' => GameStakes::STATUS_ACTIVE
            ],
            [
                'stake' => '3',
                'status' => GameStakes::STATUS_ACTIVE
            ],
            [
                'stake' => '5',
                'status' => GameStakes::STATUS_ACTIVE
            ],
            [
                'stake' => '15',
                'status' => GameStakes::STATUS_ACTIVE
            ],
            [
                'stake' => '25',
                'status' => GameStakes::STATUS_ACTIVE
            ],
            [
                'stake' => '50',
                'status' => GameStakes::STATUS_ACTIVE
            ],
            [
                'stake' => '75',
                'status' => GameStakes::STATUS_ACTIVE
            ],
            [
                'stake' => '100',
                'status' => GameStakes::STATUS_ACTIVE
            ],

        ]);
        $this->createCollection('game_rounds');
        $this->batchInsert('game_rounds',[
            [
                'round' => 1
            ],
            // [
            //     'round' => 3
            // ],
            // [
            //     'round' => 5
            // ],
            // [
            //     'round' => 7
            // ],
            
        ]);

    }

    public function down()
    {
        echo "m230522_173845_game_structure cannot be reverted.\n";

        return false;
    }
}
