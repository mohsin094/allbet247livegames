<?php
namespace common\extensions\mavens\v1;
use common\extensions\mavens\Mavens;

class MavensV1 extends Mavens
{
    const VERSION = '1.0.0';

    const ATTR_USER_LOCATION = 'Unknown';
    const ATTR_USER_AVATAR = 1;
    const ATTR_USER_GENDER = 'Male';
    const ATTR_USER_CHAT = 'Yes';
    const ATTR_USER_NOTE = 'Account created via API';

    public function init()
    {
        $this->version = self::VERSION;
    }

}