<?php

namespace backend\modules\game\models;

use Yii;

/**
 * This is the model class for collection "game_timeframes".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $timeframe
 */
class GameTimeframes extends \yii\mongodb\ActiveRecord
{
    const TIMEFRAME_SLOW = 'slow';
    const TIMEFRAME_FAST = 'fast';
    const TIMEFRAME_NORMAL = 'normal';
    
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'game_timeframes'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'timeframe',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['timeframe'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'timeframe' => Yii::t('app', 'Timeframe'),
        ];
    }
}
