describe("youtubeSearchAddon", function () {
	beforeEach(function () {
		jasmine.getFixtures().fixturesPath = "base/test";
		loadFixtures('YouTubeTest.htm');
		});
	
	it("finds videos", function () {
		var foundVideos = youtubeSearchAddon.findVideos();
		expect(foundVideos.length).toBe(9);
	});
	
	it("decorates found videos", function () {
		youtubeSearchAddon.cachedQuery = "ДТП";
		var foundVideos = youtubeSearchAddon.findVideos();
		foundVideos.forEach(youtubeSearchAddon.checkKeywords, youtubeSearchAddon);
		
		expect($(".decoratedByMaksimenko")).toHaveLength(4);
	});
	
	it("undecorates found videos", function () {
		youtubeSearchAddon.cachedQuery = "ДТП";
		var foundVideos = youtubeSearchAddon.findVideos();
		foundVideos.forEach(youtubeSearchAddon.checkKeywords, youtubeSearchAddon);
		youtubeSearchAddon.undecorate();
		expect($(".decoratedByMaksimenko")).toHaveLength(0);
	});
});