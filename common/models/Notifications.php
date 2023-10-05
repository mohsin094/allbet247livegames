<?php

namespace common\models;

use Yii;

/**
 * This is the model class for collection "notifications".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $title
 * @property mixed $description
 * @property mixed $action
 * @property mixed $cdate
 * @property mixed $udate
 * @property mixed $status
 */
class Notifications extends \yii\mongodb\ActiveRecord
{
    const ACTION_PLAY_AGAIN = 'play_again';
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return 'notifications';
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'title',
            'description',
            'action',
            'cdate',
            'udate',
            'status',
        ];
    }

    public function beforeValidate()
    {
        if($this->isNewRecord) {
            $this->status = 'active';
            $this->cdate = (string) time();
        }
        $this->udate = (string) time();
        return parent::beforeValidate();
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'description', 'action', 'cdate', 'udate', 'status'], 'safe']
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
            'description' => Yii::t('app', 'Description'),
            'action' => Yii::t('app', 'Action'),
            'cdate' => Yii::t('app', 'Cdate'),
            'udate' => Yii::t('app', 'Udate'),
            'status' => Yii::t('app', 'Status'),
        ];
    }
}
