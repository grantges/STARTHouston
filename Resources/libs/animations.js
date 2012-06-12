
exports.openTray = Ti.UI.createAnimation({
	left: Ti.Platform.displayCaps.platformWidth - 40,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT,
	duration: 1000
});

exports.closeTray = Ti.UI.createAnimation({
	left: 0,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT,
	duration: 1000
});

exports.openTrayAndroid = Ti.UI.createAnimation({
	left: Ti.Platform.displayCaps.platformWidth - 40,
	duration: 1000
});

exports.closeTrayAndroid = Ti.UI.createAnimation({
	left: 0,
	duration: 1000
})
