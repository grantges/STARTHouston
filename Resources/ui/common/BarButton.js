
var BarButton = function(_args, _callback) {
	
	_args = _args || {};
	
	var instance = Ti.UI.createImageView({
		image: _args.image || null,
		width: Ti.UI.SIZE,
		heigth: Ti.UI.SIZE,
		top: 5,
		left: 5
	});
	
	instance.addEventListener('click', function(e) {
		if(_callback) {
			_callback(e);
		}
	});
	
	return instance;
}

module.exports = BarButton;
