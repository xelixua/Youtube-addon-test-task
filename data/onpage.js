var youtubeSearchAddon = {
		videoData: {},
		cachedQuery: "",
		currentElement : null,
		WHOLE_BLOCK_CLASS: "yt-lockup-video",
		TITLE_H3_CLASS: "yt-lockup-title",
		DECORATED_CLASS: "decoratedByMaksimenko",
		decorate: function (titleElement) {
			var elem = titleElement, limit = 10;
			while(titleElement.getAttribute("class").search(this.WHOLE_BLOCK_CLASS) === -1 && limit > 0) {
				titleElement = titleElement.parentNode;
				limit--;
			}
			titleElement.setAttribute("style", "border: 1px solid red;");
			titleElement.setAttribute("class", titleElement.getAttribute("class") + " " + this.DECORATED_CLASS);
		},
		undecorate: function () {
			var decoratedElements = document.getElementsByClassName(this.DECORATED_CLASS), 
				i = 0;
			for(; i < decoratedElements.length; i++){
				decoratedElements[i].removeAttribute("style");
				decoratedElements[i].setAttribute("class", this.WHOLE_BLOCK_CLASS);
			}	
		},
		findVideos: function () {
			var resultElements = [],
				titleBlocks = document.getElementsByClassName(this.TITLE_H3_CLASS),
				videosRating = [],
				element;
			
			for(var j = 0; j < titleBlocks.length; j++){
				element = titleBlocks[j];
				if (element.tagName === "H3") {
					resultElements.push(element);
				}		
			}
			
			return resultElements;
			
		},
		checkKeywords: function (currentElement){
			//check for keywords
			var keywords = this.cachedQuery.split(" ");
			keywords.forEach(function (keyword, index, array) {
				var titleElem = currentElement.childNodes[0],
					title = titleElem.getAttribute("title"),
					videoUrl = titleElem.getAttribute("href"),
					lT = title.toLowerCase(),
					befExp = new RegExp('[а-яёa-z]' + keyword, 'ig'),
					aftExp = new RegExp(keyword + '[а-яёa-z]', 'ig');	
				if((lT.search(keyword.toLowerCase()) !== -1) &&
				(lT.search(befExp) === -1) && //filter cases when keyword 
				(lT.search(aftExp) === -1)) { //is actually a part of other word
					//modify rating
					if(typeof this.videoData[title] === 'undefined'){
						var oneVideoData = {
							title: title,
							url: "http://youtube.com" + videoUrl,
							rating: 1};
					this.videoData[title] = oneVideoData; 
					this.decorate(currentElement);
					} else {
						this.videoData[title].rating++;
					} 
				}
			}, this);
		}
	};
