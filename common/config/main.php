<?php
return [
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        // 'session' => [
        //     'class' => 'yii\web\DbSession',
        //     'db' => 'mongodb',
        //     'sessionTable' => 'sessions',
        // ],
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            // 'cookieValidationKey' => 'VlKruFJOuMSMpq-u5urBVDZXhVtmR9cy',
            // 'enableCsrfValidation' => false,
        ],
        'authManager' => [
            'class' => 'yii\rbac\PhpManager',
        ],
        'user' => [
            'class' => \backend\modules\user\components\User::class,
            'identityClass' => \common\models\Users::class,
            'enableAutoLogin' => true,
        ],
        'cache' => [
            'class' => \yii\caching\FileCache::class,
        ],
        'mongodb' => [
            'class' => '\yii\mongodb\Connection',
            'dsn' => 'mongodb://localhost:27017/backgammon',
        ],
        'redis' => [
            'class' => 'yii\redis\Connection',
            'hostname' => 'localhost',
            'port' => 6379,
            'database' => 0,
        ],
    ],
    'bootstrap' => ['debug'],
    'modules' => [
        // ...
        'gii' => [
            'class' => 'yii\gii\Module',
            'generators' => [
                'mongoDbModel' => [
                    'class' => 'yii\mongodb\gii\model\Generator'
                ]
            ],
        ],
        'debug' => [
            'class' => 'yii\\debug\\Module',
            'panels' => [
                'mongodb' => [
                    'class' => 'yii\\mongodb\\debug\\MongoDbPanel',
                    // 'db' => 'mongodb', // MongoDB component ID, defaults to `db`. Uncomment and change this line, if you registered MongoDB component with a different ID.
                ],
            ],
        ],
    ],
    'controllerMap' => [
        'mongodb-migrate' => 'yii\mongodb\console\controllers\MigrateController'
    ]
];
