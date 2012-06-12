
var Footer = function(){
	
	var instance = Ti.UI.createView({
		backgroundImage: 'images/footer-bkg.png',
		backgroundRepeat: true,
		height: 40,
		width: Ti.UI.FILL,
		bottom: 0
	});
	
	var appclogo = Ti.UI.createImageView({
		image: 'images/poweredby.png',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	instance.add(appclogo);
	
	return instance;
	
}

module.exports = Footer;