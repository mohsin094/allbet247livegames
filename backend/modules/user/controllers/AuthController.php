<?php

namespace app\modules\user\controllers;

use app\modules\user\components\ApiController;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use \common\components\Tools;
use \common\models\UserRoles;
use \common\models\Users;
use \common\components\ApiAction;
use \common\models\Tokens;
use \common\components\Mail;
use \common\models\LoginForm;

use yii\helpers\Url;

class AuthController extends ApiController
{
	public function behaviors()
	{
		return ArrayHelper::merge(parent::behaviors(), [
			'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['register', 'login', 'is-login', 'request-email-verify', 'email-verify', 'reset-password', 'request-reset-password'],
                        'roles' => ['?', '@'],
                        'allow' => true,
                    ],
                ],
            ]
		]);
	}

	public function actionRegister()
	{
		$model = new Users;
		$model->scenario = Users::SCENARIO_REGISTER;
		if($model->load(\Yii::$app->request->bodyParams) && $model->save()) {
			$mavensNewAccount = \Yii::$app->mavens->account->addNew($model);
			if($mavensNewAccount->success){
				$this->resp->result = true;
				$this->resp->params = [
					'userId' => (string) $model->_id
				];
				$this->action(ApiAction::build([ApiAction::ACTION_REDIRECT, ['url' => 'login']]));

				$token = (new \common\components\Token)->name(Tokens::TYPE_REGISTER)->userId((string)$model->_id)->exp('24h')->generate();
				
				$link = Url::to(['/user/auth/email-verify', 'user' => (string)$model->_id, 'token' => $token->token], true);
				Mail::send($model->email, \Yii::t('app', Mail::TYPE_EMAIL_VERIFICATION), $link);

				$this->debug(['link' => $link]);

			}else {
				$model->delete();
				$this->error($mavensNewAccount);
			}
		}else {
			$this->error($model->getErrors());
		}

		return $this->resp;
	}

	public function actionIsLogin()
	{
		if(!\Yii::$app->user->isGuest) {
			$this->resp->result = true;
			$this->resp->params = \Yii::$app->user->getIdentity()->publicAttributes() + [
				'mavens_url' => $this->session->get('mavens_url')
			];
		}

		return $this->resp;
	}

	public function actionLogin()
	{
		$model = new LoginForm;
		$url = '';
		if($model->load(\Yii::$app->request->bodyParams) && $model->login()) {
			$this->resp->result = true;
			$this->action(ApiAction::build([ApiAction::ACTION_REDIRECT], ['url' => 'dashboard']));
			$this->session->set('user_id', \Yii::$app->user->id);
			$this->resp->params = \Yii::$app->user->getIdentity()->publicAttributes() + [
				'sessionId' => $this->session->token,
				'mavensUrl' => $url
			];
		}else {
			$this->error($model->getErrors());
		}

		return $this->resp;
	}

	public function actionRequestEmailVerify()
	{

		$this->resp->result = true;
		$this->resp->action(ApiAction::build([ApiAction::ACTION_REDIRECT, ['url' => 'login']]));
		$token = (new \common\components\Token)->name(Tokens::TYPE_REGISTER)->userId(\Yii::$app->user->id)->exp('24h')->generate();
		$link = Url::to(['/user/auth/email-verify', 'user' => \Yii::$app->user->id, 'token' => $token], true);
		Email::send(\Yii::$app->user->getIdentity()->email,  Mail::TYPE_EMAIL_VERIFICATION, $link);
		$this->resp->debug(['link' => $link]);
	

		return $this->resp;
	}

	public function actionEmailVerify($user, $token)
	{
		$token = Tokens::find()
		->where(['user_id' => $user, 'token' => $token])
		->andWhere(['<', 'exp', ':exp'], [
			':exp' => 24*60*60
		])
		->one();
		if($token) {
			$this->resp->result = true;
			$user = Users::findOne(['_id' => $user]);
			$user->status = Users::STATUS_ACTIVE;
			$user->save();
		}else {
			$this->error(\Yii::t('app', 'Token is invalid or expired!'));
		}

		$this->action((ApiAction::build([ApiAction::ACTION_REDIRECT, ['url' => 'login']])));
		return $this->resp;
	}

	public function actionResetPassword($token)
	{
		$token = Tokens::find()->where(['token' => $token])->andWhere('exp < :exp', [
			':exp' => 24*60*60
		])->one();
		if($token) {
			$this->resp->result = true;
			$this->action((ApiAction::build([ApiAction::ACTION_REDIRECT, ['url' => 'changePassword']])));
		}else {
			$this->error(\Yii::t('app', 'Token is invalid or expired!'));
		}

		return $this->resp;
	}

	public function actionRequestResetPassword()
	{
		$this->resp->result = true;
		$this->resp->action(ApiAction::build([ApiAction::ACTION_REDIRECT, ['url' => 'login']]));
		$token = (new \common\components\Token)
		->name(Tokens::TYPE_RESET_PASSWORD)
		->userId(\Yii::$app->user->id)
		->exp('24h')
		->generate();
		$link = Url::to(['/user/auth/reset-password', 'token' => $token], true);
		Email::send(\Yii::$app->user->getIdentity()->email, Mail::TYPE_RESET_PASSWORD, $link);
		$this->resp->debug(['link' => $link]);
	

		return $this->resp;

	}


}
