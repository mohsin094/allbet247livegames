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

    const TYPE_WARNING = 'warning';
    const TYPE_PRIMARY = 'primary';
    const TYPE_MANDATORY = 'mandatory';

    const TO_ONE = 'one';
    const TO_ALL = 'all';

    const ACTION_REQUEST_PLAY_AGAIN = 'request_play_again';

    public static function toList()
    {
        return [
            self::TO_ONE => 'one',
            self::TO_ALL => 'all'
        ];
    }

    public static function typeLists()
    {
        return [
            self::TYPE_PRIMARY => 'primary',
            self::TYPE_WARNING => 'warning',
            self::TYPE_MANDATORY => 'mandatory',
        ];
    }
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'announcements'];
    }

    public function beforeValidate()
    {
        if($this->isNewRecord) {
            $this->cdate = (string) time();
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
            'title',
            'text_body',
            'cdate',
            'type',
            'to',
            'receiver_id',
            'action',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'text_body', 'cdate', 'type', 'to', 'receiver_id', 'action'], 'safe']
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
