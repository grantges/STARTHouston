var Activity = function (_args) {
	_args = _args || {};
	
	var instance =  Ti.UI.createView({
		height: 100,
		width: 100,
	});
	
	var container = Ti.UI.createView({
		backgroundColor: _args.backgroundColor || '#000',
		opacity: _args.opacity || 0.75,
		borderRadius: _args.borderRadius || 20,
	});
	instance.add(container);
	
	var activityIndicator = Ti.UI.createActivityIndicator({
		style: _args.style || Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		message: _args.message || '',
		color: _args.color || '#fff'
	});
	instance.add(activityIndicator);
	
	instance.start = function(){
		instance.show();
		activityIndicator.show();
	}
	
	instance.stop = function(){
		instance.hide();
		activityIndicator.hide();
	}
	instance.hide();
	return instance;
};

module.exports = Activity;
