<?php

namespace backend\modules\game\models;

use Yii;
use common\models\Users;
use backend\modules\game\models\GameStakes;
use backend\modules\game\models\GameTimeframes;
use backend\modules\game\models\GameRounds;

/**
 * This is the model class for collection "matches".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $home_id
 * @property mixed $away_id
 * @property mixed $round_id
 * @property mixed $stake_id
 * @property mixed $timeframe_id
 * @property mixed $status
 * @property mixed $winner
 */
class Matches extends \yii\mongodb\ActiveRecord
{
    const STATUS_WAITING = 'waiting';
    const STATUS_PLAYING = 'playing';
    const STATUS_FINISHED = 'finished';
    const STATUS_EXPIRED = 'expired';

    const TYPE_CASH_GAME = 'cash_game';
    const TYPE_TOURNAMENT = 'tournament';


    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'matches'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'home_id',
            'away_id',
            'round_id',
            'stake_id',
            'timeframe_id',
            'status',
            'winner',
            'type'
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['type', 'home_id', 'round_id', 'stake_id', 'timeframe_id', 'status'], 'required'],
            ['away_id', 'exist', 'targetClass' => Users::class, 'targetAttribute' => ['away_id' => '_id'] ],
            ['round_id', 'exist', 'targetClass' => GameRounds::class, 'targetAttribute' => ['round_id' => '_id']],
            ['stake_id', 'exist', 'targetClass' => GameStakes::class, 'targetAttribute' => ['stake_id' => '_id']],
            ['timeframe_id', 'exist', 'targetClass' => GameTimeframes::class, 'targetAttribute' => ['timeframe_id' => '_id']],
            [['away_id', 'winner'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'home_id' => Yii::t('app', 'Home ID'),
            'away_id' => Yii::t('app', 'Away ID'),
            'round_id' => Yii::t('app', 'Round ID'),
            'stake_id' => Yii::t('app', 'Stake ID'),
            'timeframe_id' => Yii::t('app', 'Timeframe ID'),
            'status' => Yii::t('app', 'Status'),
            'winner' => Yii::t('app', 'Winner'),
            'type' => Yii::t('app', 'Type')
        ];
    }

    public function formName()
    {
        return '';
    }

    public function beforeValidate()
    {
        if($this->isNewRecord) {
            $this->status = self::STATUS_WAITING;
        }

        return parent::beforeValidate();
    }
}
