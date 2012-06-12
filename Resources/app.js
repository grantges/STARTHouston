/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

else {
	var $U = require('libs/utils');
	
	// Set default config
	Ti.App.Properties.setList('data', Ti.App.Properties.getList('data', []));
	Ti.App.Properties.setBool('cache', Ti.App.Properties.getBool('cache', true));
	Ti.App.Properties.setString('url', Ti.App.Properties.getString('url', 'http://www.starthouston.com/feed'));
	
	
	//require and open top level UI component
	var TrayWindow = $U.request('ui', 'TrayWindow');
	var apptray = new TrayWindow();	
	
	apptray.open();

}

	
	

