

var TrayWindow = function(_args) {
	_args = _args || {};
	
	$U = require('libs/utils');
	var MainView = $U.request('ui', 'MainView');
	var TrayView = $U.request('ui','TrayView');
	var Footer = $U.request('ui','Footer');
	
	var instance = Ti.UI.createWindow({
		backgroundImage: 'images/tray-bkg.png',
		exitOnClose: true
	});
	
	var trayView = new TrayView();
	var mainView = new MainView();
	var footer = new Footer();
	instance.add(footer);
	instance.add(trayView);
	instance.add(mainView);
	
	
	
	return instance;
};

module.exports = TrayWindow;
