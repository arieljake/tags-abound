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
	}
};