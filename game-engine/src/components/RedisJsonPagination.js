export default {
	convert: function(perPage = 10, page = 1) {

		let from = '';
		let to = '';

		if(page === 1) {
			from = -perPage;
		}else if(page > 1) {
			from = -((perPage * page) + (page-1));
			to = (from + perPage);
		}

		let query = `[${from}:${to}]`;
		return query;
	}
}