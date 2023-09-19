const {io} = require("socket.io-client");
const axios = require("axios");
const {faker} = require("@faker-js/faker");

jest.setTimeout(3000);

const EVENTS = {
	MESSAGE: 'message',
	MESSAGE_TO_VERIFY: 'message_to_verify',
	MESSAGE_TO_DELETE: 'message_to_delete',
	MESSAGE_TO_PIN: 'message_to_pin',
	MESSAGE_TO_UNPIN: 'message_to_unpin',
	TEST: 'test',
	TEST_START: 'test_start',
	TEST_END: 'test_end'
};
const params = {
	baseUrl: 'http://31.25.90.236:3002',
	sessionHeaderName: 'X-SESS-ID',
	room: {
		id: 'default',
		name: 'default'
	},
	socket: {
		'path': '/chat',
	},
	user: {
		id: 'user-id',
		token: 'access_token',
		role: 'student'
	},
	admin: {
		id: 'admin-id',
		token: 'access-token-admin',
		role: 'admin',
		token: '0fb52d40-7277-41d6-9c74-ff3a160b6297',
		session: ''
	}
}

describe("Socket Connection And Events Test",  () => {
	let clientSocket;
	let adminSocket;
	beforeAll((done) => {

		//admin login===============================
		axios.get(params.baseUrl+"/user/login?token="+params.admin.token).then((res) => {
			if(res.data.result == true) {
				params.admin.session = res.data.data.sessionId
				//delete old room============================
				axios.delete(params.baseUrl+"/room/delete?room_id="+params.room.id, {
					headers: {
						[params.sessionHeaderName]: params.admin.session
					}
				}).then((res) => {
					if(res.data.result == true) {
						//create room================================
						axios.post(params.baseUrl+"/room/create", {

								name: params.room.name,
								id: params.room.id

						}, {
							headers: {
								[params.sessionHeaderName]: params.admin.session
							}
						}).then((res) => {
							if(res.data.result !== true) {
								console.log('Create Room Failed!');
								console.log(res.data)
							}else {
								//add users list=============================
								axios.post(params.baseUrl+"/room/user-add-list", {
									users: {
										[params.user.id]: {"username": "example", "id": params.user.id, "access_token": params.user.token, "role": params.user.role, "nickname": "Mr"},
										"user-id-2": {"username": "example", "id": 'user-id-2', "access_token": params.user.token, "role": params.user.role, "nickname": "Mr"},
										[params.admin.id]: {"username": "example", "id": params.admin.id, "access_token": params.admin.token, "role": params.admin.role, "nickname": "Mr"},
									},
									room_id: params.room.id
								}, {
									headers: {
										[params.sessionHeaderName]: params.admin.session
									}
								}).then((res) => {
									if(res.data.result !== true) {
										console.log('Add User Failed');
										console.log(res.data)
									}else {
										clientSocket = new io(`${params.baseUrl}/room/default`, {
											path: params.socket.path,
											auth: {
												[params.sessionHeaderName]: params.user.token,
												userId: params.user.id
											}
										});


										clientSocket.on("connect", () => {
											adminSocket = new io(`${params.baseUrl}/room/default`, {
												path: params.socket.path,
												auth: {
													[params.sessionHeaderName]: params.admin.token,
													userId: params.admin.id
												}
											});

											adminSocket.on("connect", () => {
												console.log('admin connected');
												done();
											});
											console.log('user connected');
										});


									}
								}).catch((error) => console.log(error));
							}
						}).catch((error) => console.log(error));

					}else {
						console.log('Delete Room Failed');
					}
				}).catch((error) => console.log(error));
			}else {
				console.log('Admin Credentials Is Wrong!');
			}
		}).catch((error) => console.log(error));
	});


	test("answer-test", (done) => {
		for(let i=0;i<1;i++) {
			const r = adminSocket.emit('/test-create', {type: 2, test_options:['options 1', 'option 2']}, (callback) => {
				console.log(callback)
				clientSocket.emit('/test-answer', {message_id: callback.data.message_id, choices: [0]});
				done();
			});
		}
	
	});

	// test("receive-test-end", (done) => {
	// 	clientSocket.on(EVENTS.TEST_END, (data) => {
	// 		console.log(data)
	// 		expect(typeof data).toBe('object');
	// 		done();
	// 	});
	// 	for(let i=0;i<1;i++) {
	// 		const r = adminSocket.emit('/test-create', {type: 2, test_options:['options 1', 'option 2']}, (callback) => {
	// 			adminSocket.emit('/test-end', {message_id: callback.data.message_id});
	// 		});
	// 	}
	// });

	// test("receive-test-start", (done) => {
	// 	clientSocket.on(EVENTS.TEST_START, (data) => {
	// 		console.log(data)
	// 		expect(typeof data).toBe('object');
	// 		done();
	// 	});
	// 	for(let i=0;i<1;i++) {
	// 		const r = adminSocket.emit('/test-create', {type: 2, test_options:['options 1', 'option 2']}, (callback) => {
	// 			console.log(callback);
	// 			adminSocket.emit('/test-start', {message_id: callback.data.message_id});
	// 		});
	// 	}
	// });

	// test("receive-test", (done) => {
	// 	adminSocket.on(EVENTS.TEST, (data) => {
	// 		console.log(data)
	// 		expect(typeof data).toBe('object');
	// 		done();
	// 	});
	// 	for(let i=0;i<1;i++) {
	// 		const r = adminSocket.emit('/test-create', {type: 2, test_options:['options 1', 'option 2']});
	// 	}
	// });


	// test("test-send-bulk-message", (done) => {
	// 	for(let i=0;i<10;i++) {
	// 		clientSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)});
	//
	// 	}
	//
	// 	for(let i=0;i<10;i++) {
	// 		adminSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)});
	// 	}
	// 	done();
	// });
	//
	//
	// test("receive-message", (done) => {
	// 	clientSocket.on(EVENTS.MESSAGE, (data) => {
	// 		console.log(data)
	// 		expect(typeof data).toBe('object');
	// 	});
	// 	for(let i=0;i<1;i++) {
	// 		const r = adminSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)}, (data) => {
	// 			console.log(data);
	// 			done();
	// 		});
	// 	}
	// });
	//
	// test("verify-message", (done) => {
	//
	// 	clientSocket.on(EVENTS.MESSAGE, (data) => {
	// 		expect(data.message).toBe('after verified');
	// 		done();
	// 	})
	//
	// 	for(let i=0;i<1;i++) {
	// 		const r = clientSocket.emit('/message-send', {type: 1, message:'after verified'}, (callback) => {
	// 			adminSocket.emit('/message-verify', {message_id: callback.data.message_id});
	// 		});
	// 	}
	// });
	//
	// test("reply-message", (done) => {
	//
	// 	clientSocket.on(EVENTS.MESSAGE, (data) => {
	// 		console.log(data)
	// 		expect(data.message).toBe('reply to');
	// 		done();
	// 	})
	//
	// 	for(let i=0;i<1;i++) {
	// 		const r = clientSocket.emit('/message-send', {type: 1, message:faker.lorem.words(20)}, (callback) => {
	// 			console.log(callback)
	// 			adminSocket.emit('/message-reply', {type: 1, message:'reply to', reply_to: callback.data.message_id}, (callback) => {
	// 				console.log(callback)
	// 			});
	// 		});
	// 	}
	// });
	//
	// test("receive-message-verify", (done) => {
	// 	adminSocket.on(EVENTS.MESSAGE_TO_VERIFY, (data) => {
	// 		console.log(data)
	// 		expect(typeof data).toBe('object');
	// 		done();
	// 	});
	// 	for(let i=0;i<1;i++) {
	// 		const r = clientSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)});
	// 	}
	// });
	//
	// test("receive-message-delete", (done) => {
	// 	clientSocket.on(EVENTS.MESSAGE_TO_DELETE, (data) => {
	// 		console.log(data)
	// 		expect(typeof data).toBe('object');
	// 		done();
	// 	});
	//
	// 	for(let i=0;i<1;i++) {
	// 		const r = adminSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)}, (data) => {
	// 			console.log(data);
	// 			adminSocket.emit('/message-delete', {message_id: data.data.message_id});
	// 		});
	// 	}
	// });
	//
	//

	// test("receive-message-pin", (done) => {
	// 	clientSocket.on('message_to_pin', (data) => {
	// 		console.log(data)
	// 		expect(typeof data).toBe('object');
	// 		done();
	// 	});
	//
	//
	// 	for(let i=0;i<1;i++) {
	// 		const r = adminSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)}, (data) => {
	// 			console.log(data);
	// 			adminSocket.emit('/message-pin', {message_id: data.data.message_id});
	// 		});
	// 	}
	// });

	// test("receive-message-unpin", (done) => {
	// 	console.log(EVENTS.MESSAGE_TO_UNPIN);
	// 	clientSocket.on('message_to_unpin', (data) => {
	// 		console.log(data)
	// 		expect(typeof data).toBe('object');
	// 		done();
	// 	});
	//
	// 	for(let i=0;i<1;i++) {
	// 		const r = adminSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)}, (data) => {
	// 			adminSocket.emit('/message-unpin', {message_id: data.data.message_id});
	// 		});
	// 	}
	// });

	//
	// test("message-get page 1 per page 10", (done) => {
	// 	for(let i=0;i<20;i++) {
	// 		adminSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)});
	// 	}
	//
	// 	setTimeout(() => {
	// 		clientSocket.emit('/message-get', {}, (callback) => {
	// 			console.log(callback)
	// 			expect(callback.data).toHaveLength(10);
	// 			done();
	// 		});
	//
	// 	}, 2000)
	// });
	//
	//
	// test("message-get page 2 per page 10", (done) => {
	// 	for(let i=0;i<20;i++) {
	// 		adminSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)});
	// 	}
	//
	// 	setTimeout(() => {
	// 		clientSocket.emit('/message-get', {page: 2}, (callback) => {
	// 			expect(callback.data).toHaveLength(10);
	// 			done();
	// 		});
	// 	}, 2000)
	// });
	//
	// test("message-get page 3 per page 30", (done) => {
	//
	// 	for(let i=0;i<100;i++) {
	// 		adminSocket.emit('/message-send', {type: 1, message: faker.lorem.words(20)});
	// 	}
	// 	setTimeout(() => {
	// 		clientSocket.emit('/message-get', {page: 3, per_page: 30}, (callback) => {
	// 			expect(callback.data).toHaveLength(30);
	// 			done();
	// 		});
	// 	}, 2000)
	// });

	afterAll(() => {
		clientSocket.close();
	});



});


