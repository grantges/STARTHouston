
/**
 * WordPress RSS Reader
 * main.js - Shows a list of posts
 * 
 * 
 * WordPress RSS Reader is licensed under the terms of the ZLIB license
 * 
 * Copyright © 2011 The Lonely Coder 
 * 
 * This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software. 
 * 
 * Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions: 
 *   The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required. 
 *   Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software. 
 *   This notice may not be removed or altered from any source distribution.
 * 
 */

var _refresh = function(e){ // HTTP connection
	http = Titanium.Network.createHTTPClient({
		onload: function(e) {
			try {
				var xml = this.responseXML;
				var data = [];
	
				// Get channel title
				var channel = xml.documentElement.getElementsByTagName('channel');
				data.push({
					title: channel.item(0).getElementsByTagName('title').item(0).text
				});
	
				// Get the items
				var itemList = xml.documentElement.getElementsByTagName('item');
				for (var i = 0; i < itemList.length; i++) {
					data.push({
						title: itemList.item(i).getElementsByTagName('title').item(0).text,
						description: itemList.item(i).getElementsByTagName('description').item(0).text
					});
				}
	
				// Done
				Titanium.App.Properties.setList('data', data);
				Ti.App.fireEvent('app:load.data', {
					data: data
				});
	
			} catch (e) {
				Titanium.API.error("Exception @ loading RSS: " + e.message);
			}
		},
		onerror: function(event) {
			Titanium.API.error("HTTP error @ loading RSS");
		}
	});
	
	// Fetch RSS
	var url = Ti.App.Properties.getString('url');
	http.open('GET', url);
	http.send();
};

var BlogRoll = function() {
	$U = require('libs/utils');
	
	var instance = Titanium.UI.createView({
		backgroundColor: '#fff',
		tabBarHidden: true,
		title: '',
		layout: 'vertical'
	});
	
	var title = Ti.UI.createLabel({
		top: 10,
		left: 10,
		right: 10,
		height: Ti.UI.SIZE,
		font: {fontSize: 18, fontFamily: 'Helvetica', fontWeight: 'bold'},
		color: '#000'
	});
	instance.add(title);
	
	var description = Ti.UI.createLabel({
		top: 5,
		left: 10,
		right: 10,
		height: Ti.UI.SIZE,
		font: {fontSize: 14, fontFamily: 'Helvetica'},
		color: '#666'
	});

	// List of posts
	var postTable = Ti.UI.createTableView({
		backgroundColor: '#ececec',
		borderRadius: 3,
	});
	instance.add(postTable);


	// Add data to the list
	Ti.App.addEventListener('app:load.data', function(e){
		var data = e.data;
		
		title.text = data[1].title;
		description.text = data[1].description;
		
		// Show the list (in case the RSS was being loaded)
		postTable.show();

		// Clear existing data
		postTable.data = [];

		// Add the rest of the content
		for( var i = 2; i < data.length; i++ ) {
			postTable.appendRow(Ti.UI.createTableViewRow({
				className: 'post-row',
				title: data[i].title,
				content: data[i].description,
				backgroundColor: 'transparent',
				font: {fontSize: 10 },
				height: Ti.UI.SIZE
			}));
		}
	});
	
	_refresh();

	return instance;
}

module.exports = BlogRoll;	