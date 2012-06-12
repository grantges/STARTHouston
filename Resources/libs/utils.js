exports.osname = Ti.Platform.osname;
exports.iOS = function() { return (Ti.Platform.osname === 'ipad' || Ti.Platform.osname ==='iphone')};
exports.android = function() { return Ti.Platform.osname === 'android' }
exports.isTablet = function(){
	if(Ti.Platform.osname ==='ipad') return true;
	
	if(Ti.Platform.osname === 'android'){
		if(exports.screenHeight > 800 || exports.screenWidth > 800) return true;
	}
	
	return false;
}

exports.request = function(cat, mod){
	var deviceType = (exports.isTablet()) ? 'tablet' : 'handheld',
		modPath = null;
	
	//Check for existing file in root then common directory before going for deviceType
	if(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator+cat+Ti.Filesystem.separator+mod+'.js').exists()) {
		modPath = cat+Ti.Filesystem.separator+mod;
	}
	else if(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator+cat+Ti.Filesystem.separator+'common'+Ti.Filesystem.separator+mod+'.js').exists()) {
		modPath = cat+Ti.Filesystem.separator+'common'+Ti.Filesystem.separator+mod;
	}
	else {
		modPath = cat+Ti.Filesystem.separator+deviceType+Ti.Filesystem.separator+Ti.Platform.osname+ Ti.Filesystem.separator+mod;
	}
	
	return (modPath) ? require(modPath) : null;
}

exports.screenHeight = function() {
	return Ti.Platform.displayCaps.platformHeight;
};

exports.screenWidth = function() {
	return Ti.Platform.displayCaps.platformWidth;
};
