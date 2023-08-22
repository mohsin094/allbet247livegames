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
 */
class MatchEvents extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'match_events'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'winner_id',
            'match_id',
            'status',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['winner_id', 'match_id', 'status'], 'safe']
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
        ];
    }
}
