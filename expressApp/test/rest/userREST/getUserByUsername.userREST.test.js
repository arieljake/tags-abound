



	describe("getUserByUsername", function ()
	{
		it('should call dao with specified username from request', function ()
		{
			var userDAOSpy = sinon.spy(userDAO, 'findUserByUsername');

			var reqUsernameParam = "username";
			req.params[reqUsernameParam] = "username";

			userREST.getUserByUsername(reqUsernameParam).call(userREST,req,res);

			assert.equal(userDAOSpy.firstCall.args[0],req.params[reqUsernameParam]);
		});

		it('should return jsonp formatted text for user', function ()
		{
			var user = {
				username: "username",
				tags: "tags"
			};

			var userDAOStub = sinon.stub(userDAO, 'findUserByUsername', function (username,callback)
			{
				callback(user);
			});

			req.params.username = user.username;

			var resSpy = sinon.spy(res,"send");

			userREST.getUserByUsername("username").call(userREST,req,res);

			assert.ok(resSpy.calledOnce);
			assert.equal(resSpy.firstCall.args[0],listly.renderUtils.outputJSONP(req,user));
		});

		it('should remove user password and _id', function ()
		{
			var user = {
				username: "username",
				tags: "tags",
				password: "password",
				_id: "_id"
			};

			var returnUser = underscore.clone(user);
			delete returnUser.password;
			delete returnUser._id;

			var userDAOStub = sinon.stub(userDAO, 'findUserByUsername', function (username,callback)
			{
				callback(user);
			});

			req.params.username = user.username;

			var resSpy = sinon.spy(res,"send");

			userREST.getUserByUsername("username").call(userREST,req,res);

			assert.ok(resSpy.calledOnce);
			assert.equal(resSpy.firstCall.args[0],listly.renderUtils.outputJSONP(req,returnUser));
		});
	});