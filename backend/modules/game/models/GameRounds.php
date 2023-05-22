<?php

namespace backend\modules\game\models;

use Yii;

/**
 * This is the model class for collection "game_rounds".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $round
 */
class GameRounds extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return ['backgammon', 'game_rounds'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'round',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['round'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'round' => Yii::t('app', 'Round'),
        ];
    }
}
