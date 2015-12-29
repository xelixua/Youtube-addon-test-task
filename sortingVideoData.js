var sortVideoData = function (videoData) { //TODO put in separate module
	var videoDataKeys = Object.keys(videoData),
		byRating = function (titleA, titleB) {
			if(videoData[titleA].rating < videoData[titleB].rating) return -1;
			if(videoData[titleA].rating > videoData[titleB].rating) return 1;
			return 0;
		},
		sortedVideoData = [],
		j = videoDataKeys.length - 1;
					
		videoDataKeys.sort(byRating);
		for (; j >= 0; j--) {
			sortedVideoData.push(videoData[videoDataKeys[j]]);
		}
		return sortedVideoData;
};

exports.sortVideoData = sortVideoData;