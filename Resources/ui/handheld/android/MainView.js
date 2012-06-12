//Application Window Component Constructor
function MainView(_args) {
	_args = _args || {};
	var instance = Ti.UI.createView({
		backgroundColor:'#ffffff',
		layout: 'vertical',
		width: Ti.Platform.displayCaps.platformWidth,
		left: 0,
		height: Ti.Platform.displayCaps.platformHeight
	});
	
	//var container = Ti.UI.createView();
	var header = Ti.UI.createView({
		backgroundColor: '#000',
		width: Ti.Platform.displayCaps.platformWidth,
		height: 40,
		left: 0,
	});
	var headerTitleImg = Ti.UI.createImageView({
		image: 'images/title-img.png',
		top: 5
	});
	header.add(headerTitleImg);
	
	
	var BarButton = $U.request('ui', 'BarButton');
	var trayButton = new BarButton({image: 'images/twitter_bar_icon.png'}, function(e) {
		$A = require('libs/animations');
		
		if(instance.out === false) {
			$A.openTray.addEventListener('complete', function(e){
				instance.out = true;
			});
			instance.animate($A.openTray);
		}
		else {
			$A.closeTray.addEventListener('complete', function(e){
				instance.out = false;
			});
			instance.animate($A.closeTray);
		}
	});
	header.add(trayButton);
	instance.add(header);
	
	
	//instance.add(container);
	return instance;
}

//make constructor function the public component interface
module.exports = MainView;
