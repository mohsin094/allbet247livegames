<?php
use common\models\UserRoles;

class m230521_150034_build_roles extends \yii\mongodb\Migration
{
    public function up()
    {
        $this->createCollection('user_roles');
        $this->batchInsert('user_roles',[
            [
                'name' => UserRoles::ROLE_USER
            ],
            [
                'name' => UserRoles::ROLE_AGENT
            ],
            [
                'name' => UserRoles::ROLE_ADMIN
            ],
        ]);
    }

    public function down()
    {
        echo "m230521_150034_build_roles cannot be reverted.\n";

        return false;
    }
}
