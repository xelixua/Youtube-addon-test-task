var buttons = require('sdk/ui/button/action'),
	tabs = require("sdk/tabs"),
	self = require("sdk/self"),
	sorting = require("sortingVideoData"),
	sidebar = require("sdk/ui/sidebar").Sidebar({
	id: 'addon-sidebar',
	title: 'Youtube videos search',
	url: "./sidebar.html",
	onAttach: function (worker) {
		worker.port.on("search-query", function (searchQuery) {
			onpageWorker = tabs.activeTab.attach({
		      contentScriptFile: [self.data.url("onpage.js"),
      					  		self.data.url("onpageRun.js")]
    		});
			if(typeof onpageWorker !== 'undefined'){
				onpageWorker.port.emit("search-query", searchQuery.toLowerCase());
				onpageWorker.port.on("search-result", function (videoData) {
						var sortedVideoData = sorting.sortVideoData(videoData);
						worker.port.emit("search-result", sortedVideoData);
					});
				}
			});
		}
	}),
	onpageWorker,
	button = buttons.ActionButton({
  		id: "mozilla-link",
  		label: "Youtube list",
  		icon: {
    		"16": "./icon-16.png",
    		"32": "./icon-32.png",
    		"64": "./icon-64.png"
  		},
  		onClick: openSidebar
	});

function openSidebar(state) {
	sidebar.show();
  	tabs.activeTab.url = "http://youtube.com";
  	/*onpageWorker = tabs.activeTab.attach({
      contentScriptFile: [self.data.url("onpage.js"),
      					  self.data.url("onpageRun.js")]
    });*/
}
