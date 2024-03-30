import conf from '#components/ConfProvider'
export function getName(name) {
	return conf.getParam('cookiePrefix')+name;
}

export const NAME = {
	SESSION_ID: 'x_sess_id'
}