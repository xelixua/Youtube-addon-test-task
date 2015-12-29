var sorting = require("../sortingVideoData");

describe("sorting", function () {
  it("should sort videoData byRating", function () {
  	var videoData = 
  		[{title: "video1",
  		 url: "http://www.youtube.com/vid1",
  		 rating: 5},
  		 {title: "video2",
  		 url: "http://www.youtube.com/vid2",
  		 rating: 3},
  		 {title: "video3",
  		 url: "http://www.youtube.com/vid3",
  		 rating: 8}],
    	sortedData= sorting.sortVideoData(videoData);
    	
    expect(sortedData).toEqual([
    	{title: "video3",
  		 url: "http://www.youtube.com/vid3",
  		 rating: 8},
  		 {title: "video1",
  		 url: "http://www.youtube.com/vid1",
  		 rating: 5},
  		{title: "video2",
  		 url: "http://www.youtube.com/vid2",
  		 rating: 3}]);
  });
});  