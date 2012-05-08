var directives = {};

directives.tagsInputFactory = function ()
{
	return function (scope, element, attrs)
	{
		var tagsInputSettings = {};

		if ($(element).attr('ng-model') != undefined)
		{
			tagsInputSettings.onChange = function (element, tags)
			{
				var modelDestPath = $(element).attr('ng-model').split(".");
				var modelDest = function dive(dest, path)
				{
					if (path.length == 1)
					{
						return dest;
					}

					var propName = path.shift();
					return dive(dest[propName], path);

				}(scope, modelDestPath);

				modelDest[modelDestPath.pop()] = $(element).val();
			};
		}

		$(element).tagsInput(tagsInputSettings);
	};
};

/** http://jsfiddle.net/alimills/7Trgz/ **/
directives.onEnter = function ()
{
	return function (scope, element, attrs)
	{
		$(element).bind('keydown keypress', function (e)
		{
			if (e.charCode == 13)
			{
				var fxnName = attrs["onEnter"];
				var value = $(element).val();
				$(element).val('');

				scope[fxnName](value);
				scope.$apply();

				// cancel form submit
				return false;
			}
		});
	};
};

directives.stopRkey = function ()
{
	return function (scope, element, attrs)
	{
		document.onkeypress = function (evt)
		{
			var evt = (evt) ? evt : ((event) ? event : null);
			var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
			if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
		};
	};
};
