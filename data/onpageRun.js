(function () {
	var yLevel = 0,
		query,
		HANDLER_ATTACHED = "maksimenkoAttached",
		processQuery = function (query) {
		var lmButtons = document.getElementsByClassName("load-more-button"),
			buttonClass;
			if(lmButtons.length !== 0){
				for(var j = 0; j < lmButtons.length; j++){
					buttonClass = lmButtons[j].getAttribute("class");
					if(buttonClass.search(HANDLER_ATTACHED) === -1){
						lmButtons[j].addEventListener("click", function () {
							if(typeof youtubeSearchAddon.cachedQuery !== 'undefined') processQuery();
						});
						lmButtons[j].setAttribute("class", buttonClass + " " + HANDLER_ATTACHED);
					}
				}
		}
		if(typeof query !== 'undefined'){
			youtubeSearchAddon.cachedQuery = query;
		}
		youtubeSearchAddon.undecorate();
		var foundVideos = youtubeSearchAddon.findVideos();
		foundVideos.forEach(youtubeSearchAddon.checkKeywords, youtubeSearchAddon);
		self.port.emit("search-result", youtubeSearchAddon.videoData);
		youtubeSearchAddon.videoData = {};
	};

	window.onscroll = function () {
		if (window.scrollY - yLevel > 1900 &&
			(typeof youtubeSearchAddon.cachedQuery !== 'undefined')) {
				yLevel = window.scrollY;
				processQuery();
		}
	};
	self.port.on("search-query", processQuery);
})();
