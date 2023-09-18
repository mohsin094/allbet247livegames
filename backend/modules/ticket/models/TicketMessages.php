<?php

namespace backend\modules\ticket\models;

use Yii;

/**
 * This is the model class for collection "ticket_messages".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $ticket_id
 * @property mixed $user_id
 * @property mixed $message
 * @property mixed $attachment_path
 * @property mixed $cdate
 * @property mixed $type
 */
class TicketMessages extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'ticket_messages'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'ticket_id',
            'user_id',
            'message',
            'attachment_path',
            'cdate',
            'type',
        ];
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
    public function rules()
    {
        return [
            [['ticket_id', 'user_id', 'message', 'attachment_path', 'cdate', 'type'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'ticket_id' => Yii::t('app', 'Ticket ID'),
            'user_id' => Yii::t('app', 'User ID'),
            'message' => Yii::t('app', 'Message'),
            'attachment_path' => Yii::t('app', 'Attachment Path'),
            'cdate' => Yii::t('app', 'Cdate'),
            'type' => Yii::t('app', 'Type'),
        ];
    }
}
