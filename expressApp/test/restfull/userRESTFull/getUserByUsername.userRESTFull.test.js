



	describe("getUserByUsername", function ()
	{
		it('should return user returned from DB', function ()
		{
			var err = null;
			var item = {
				username: "username",
				password: "password"
			};
			var items = [item];

			var dbStub = sinon.stub(db, 'toArray', function (callback)
			{
				callback(err,items);
			});

			var resSpy = sinon.spy(res,"send");

			userREST.getUserByUsername("username").call(userREST,req,res);

			assert.ok(resSpy.calledOnce);
			assert.equal(resSpy.firstCall.args[0],listly.renderUtils.outputJSONP(req,item));
		});

		it('should return null if no items returned from DB', function ()
		{
			var err = null;
			var items = [];

			var dbStub = sinon.stub(db, 'toArray', function (callback)
			{
				callback(err,items);
			});

			var resSpy = sinon.spy(res,"send");

			userREST.getUserByUsername("username").call(userREST,req,res);

			assert.ok(resSpy.calledOnce);
			assert.equal(resSpy.firstCall.args[0],listly.renderUtils.outputJSONP(req,null));
		});
	});