

var TrayView = function(_args){
	_args = _args || {};
	
	$U = require('libs/utils');
	
	var instance = Ti.UI.createView({
		backgroundColor: 'transparent',
		left: 0,
		right: 40,
		bottom: 40
	});
	
	
	var TwitterTable = $U.request('ui', 'TwitterTableView');
	var twitter = new TwitterTable({screenNames: 'starthouston', hashtags:'STARTHack', autoUpdate: true, interval: 30000});
	instance.add(twitter);
	
	return instance;
};

module.exports = TrayView;