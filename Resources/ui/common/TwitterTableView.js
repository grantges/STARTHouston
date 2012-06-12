

var TwitterTable = function(_args) {
	
	$U = require('libs/utils');
	
	var instance = Ti.UI.createView({backgroundColor: 'transparent'});
	instance.intervalID = null;
	
	// Create the tableView and add it to the view.	
	var tableview = Titanium.UI.createTableView({
		minRowHeight:58,
		backgroundColor: 'transparent'
	});
	instance.add(tableview);
	
	var ai=null;
	if(Ti.Platform.osname != 'mobileweb') {
		var AI = require('ui/common/Activity');
		ai = new AI();
		instance.add(ai);
	}
	
	function getTweets(screen_names, hashtags){
		(Ti.Platform.osname != 'mobileweb') ? ai.start() :null;
		// create table view data object
		var data = [];
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000000;
		xhr.open("GET","http://search.twitter.com/search.json?q="+screen_names+'%20'+hashtags); 
	
		xhr.onload = function()
		{
			try
			{
				var tweets = eval('('+this.responseText+')');
	
				for (var c=0;c<tweets.results.length;c++){
	
					var tweet = tweets.results[c].text;
					var user = tweets.results[c].from_user_name;
					var avatar = tweets.results[c].profile_image_url;
					//var created_at = prettyDate(strtotime(tweets[c].created_at));
					var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
	
					var row = Ti.UI.createTableViewRow({
						hasChild:false,
						height:'fill',
						backgroundColor:'transparent',
						opacity: 0.3,
					});
	
					// Create a vertical layout view to hold all the info labels and images for each tweet
					var post_view = Ti.UI.createView({
						height:'fill',
						layout:'vertical',
						left:5,
						top:5,
						bottom:5,
						right:5
					});
	
					var av = Ti.UI.createImageView({
							image:avatar,
							left:0,
							top:0,
							height:48,
							width:48
						});
					// Add the avatar image to the view
					post_view.add(av);
	
					var user_label = Ti.UI.createLabel({
						text:user,
						left:54,
						width:Ti.UI.SIZE,
						top:-48,
						bottom:2,
						height:16,
						textAlign:'left',
						color:'#fff',
						font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
					});
					// Add the username to the view
					post_view.add(user_label);
					
					var tweet_text = Ti.UI.createLabel({
						text:tweet,
						left:54,
						top:0,
						bottom:2,
						height:'fill',
						width:Ti.UI.SIZE,
						textAlign:'left',
						font:{fontSize:14},
						color: '#fff'
					});
					// Add the tweet to the view
					post_view.add(tweet_text);
					// Add the vertical layout view to the row
					row.add(post_view);
					row.className = 'item'+c;
					data.push(row);
				}
				($U.iOS()) ? tableview.setData(data, {animate: true, animateStyle: Ti.UI.iPhone.RowAnimationStyle.TOP}) :
							tableview.setData(data);
			}
			catch(E){
				alert(E);
			}
			
			(Ti.Platform.osname != 'mobileweb') ? ai.stop() : null;
		};
		// Get the data
		xhr.send();
	}
	
	instance.addEventListener('twitter-refresh', function(e){
		getTweets(e.screenNames, e.hashtags);
	});
	
	instance.startUpdate = function(interval){
		instance.intervalID = setInterval(function(){
			instance.fireEvent('twitter-refresh', {screenNames: 'starthouston', hashtags:'STARTHack'} );
		}, interval);
	};
	
	instance.stopUpdate = function(){
		if(instance.intervalID) { instance.intervalID.clear(); }
	};
	
	// Get the tweets for 'twitter_name'
	getTweets(_args.screenNames, _args.hashtags);
	
	if(_args.autoUpdate)
		instance.startUpdate(_args.interval);
	
	var shadow = Ti.UI.createView({
		top: 0,
		left: 0,
		right: 0,
		height: 10,
		backgroundGradient: {
			type: 'linear',
			colors: [{color: '#000', offset: 0.0 }, {color: "transparent", offset: 1.0}],
			startPoint: {x: 0, y: 0},
			endPoint: {x: 10, y: 0},
		}
	});
	instance.add(shadow);
	
	
	return instance;
};

module.exports = TwitterTable;