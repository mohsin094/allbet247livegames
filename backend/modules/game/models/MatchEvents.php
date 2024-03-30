<?php

namespace backend\modules\game\models;

use Yii;

/**
 * This is the model class for collection "match_events".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $winner_id
 * @property mixed $match_id
 * @property mixed $status
 * @property mixed $cdate
 */
class MatchEvents extends \yii\mongodb\ActiveRecord
{
    const STATUS_WAITING = 'waiting';
    const STATUS_PLAYING = 'playing';
    const STATUS_FINISHED = 'finished';

    public static function statusList()
    {
        return [
            self::STATUS_WAITING => 'waiting',
            self::STATUS_PLAYING => 'playing',
            self::STATUS_FINISHED => 'finished'
        ];
    }
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'match_events'];
    }

    public function beforeValidate()
    {
        if($this->isNewRecord) {
            $this->cdate = (string) time();
            $this->status = self::STATUS_WAITING;
        }
        return parent::beforeValidate();
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'winner',
            'match_id',
            'status',
            'cdate',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['winner', 'match_id', 'status', 'cdate'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'winner_id' => Yii::t('app', 'Winner ID'),
            'match_id' => Yii::t('app', 'Match ID'),
            'status' => Yii::t('app', 'Status'),
            'cdate' => Yii::t('app', 'Cdate'),
        ];
    }
}
