<?php

namespace backend\modules\announcement\models;

use Yii;

/**
 * This is the model class for collection "announcements".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $title
 * @property mixed $text_body
 * @property mixed $cdate
 * @property mixed $type
 */
class Announcements extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'announcements'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'title',
            'text_body',
            'cdate',
            'type',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'text_body', 'cdate', 'type'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'title' => Yii::t('app', 'Title'),
            'text_body' => Yii::t('app', 'Text Body'),
            'cdate' => Yii::t('app', 'Cdate'),
            'type' => Yii::t('app', 'Type'),
        ];
    }
}
