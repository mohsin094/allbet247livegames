<?php

namespace backend\modules\game\models;

use Yii;

/**
 * This is the model class for collection "game_stakes".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $stake
 */
class GameStakes extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'game_stakes'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'stake',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['stake'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'stake' => Yii::t('app', 'Stake'),
        ];
    }
}
