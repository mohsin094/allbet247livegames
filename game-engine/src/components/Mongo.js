import {MongoClient} from "mongodb";
import ConfProvider from "#components/ConfProvider";

export default {
	cn: undefined,
	db: undefined,
	init: async function() {
		const credentials = ConfProvider.getDb('mongodb');

		let url = undefined;
	
		if(credentials.user != "") {
			url = `mongodb://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}/?serverSelectionTimeoutMS=2000&directConnection=true`;

		}else {
			url = `mongodb://${credentials.host}:${credentials.port}/?serverSelectionTimeoutMS=2000`;
		}
		this.cn = new MongoClient(url);

		await this.cn.connect();


		console.log('mongodb connected');
		this.db = this.cn.db(credentials.dbName);
		return this;

	},

	disconnect: function() {
		this.cn.close();
	}
}
