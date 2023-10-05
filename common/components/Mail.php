<?php


namespace common\components;


class Mail
{
    // email verification $link
    const TYPE_EMAIL_VERIFICATION = 'email_verification';
    const TYPE_RESET_PASSWORD = 'reset_password';
    
    public static function send($to, $subject, $text, $from = null)
    {
        if($from == null)
            $from = \Yii::$app->params['senderEmail'];
        return \Yii::$app->getMailer()->compose()
        ->setFrom($from)
        ->setTo($to)
        ->setSubject(\Yii::$app->name.'|'.$subject)
        ->setHtmlBody($text)->send();
    }
}