<?php

namespace backend\modules\ticket\models;

use Yii;
use backend\modules\ticket\models\TicketMessages;

/**
 * This is the model class for collection "tickets".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $user_id
 * @property mixed $title
 * @property mixed $cdate
 * @property mixed $udate
 * @property mixed $status
 */
class Tickets extends \yii\mongodb\ActiveRecord
{

    const STATUS_CLOSED = 'closed';
    const STATUS_OPEN = 'open';
    const STATUS_USER_PENDING = 'user_pending';
    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return [\Yii::$app->params['mongodbDbName'], 'tickets'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'user_id',
            'title',
            'cdate',
            'udate',
            'status',
        ];
    }

    public function reply($post)
    {
        
        $mess = new TicketMessages;
        $mess->ticket_id = (string) $this->_id;
        $mess->user_id = \Yii::$app->user->id;
        $mess->message = $post['message'];
        return $mess->save();
      
    }

    public function createNewTicket($post)
    {
        $this->user_id = \Yii::$app->user->id;
        $this->status = self::STATUS_OPEN;
        $this->title = $post['title'];
        if($this->save()) {
            $mess = new TicketMessages;
            $mess->ticket_id = (string) $this->_id;
            $mess->user_id = \Yii::$app->user->id;
            $mess->message = $post['message'];
            return $mess->save();
        }   
    }

    public function beforeValidate()
    {
        if($this->isNewRecord) {
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
            [['user_id', 'title', 'cdate', 'udate', 'status'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => Yii::t('app', 'ID'),
            'user_id' => Yii::t('app', 'User ID'),
            'title' => Yii::t('app', 'Title'),
            'cdate' => Yii::t('app', 'Cdate'),
            'udate' => Yii::t('app', 'Udate'),
            'status' => Yii::t('app', 'Status'),
        ];
    }
}
