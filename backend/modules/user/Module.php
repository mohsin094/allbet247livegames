<?php

namespace app\modules\user;

/**
 * user module definition class
 */
class Module extends \yii\base\Module
{
    /**
     * {@inheritdoc}
     */
    public $controllerNamespace = 'app\modules\user\controllers';

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();

        $this->registerTranslations();
        // custom initialization code goes here
    }

    public function registerTranslations()
    {
        \Yii::$app->i18n->translations['modules/user/*'] = [
            'class' => '\yii\i18n\PhpMessageSource',
            'sourceLanguage' => 'en-US',
            'basePath' => '@backend/modules/user/messages',
            'fileMap' => [
                'modules/user/app' => 'app.php'
            ],
        ];
    }

    public static function t($category, $message, $params = [], $language = null)
    {
        return \Yii::t('modules/user/' . $category, $message, $params, $language);
    }
}
