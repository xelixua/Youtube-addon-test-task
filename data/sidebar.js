(function () {
	"use strict";
	
	var app = angular.module("sidebar-app", []),
		indexedDB = window.indexedDB,
		IDBTransaction = window.IDBTransaction;
	
	app.controller("searchController", ['$scope', '$rootScope', function (scope, rootScope) {
		var connectToDB = function (callback) {
			var request = indexedDB.open("acdb", 1);
			request.onerror = function(err){
				console.log(err);
			};
			request.onsuccess = function(){
				callback(request.result);
			};
			request.onupgradeneeded = function(e){
				e.currentTarget.result.createObjectStore("acdbStore", {autoIncrement: true});
				connectToDB(callback);
			};
		},
		previousReplace; //don't complete same word twice
		scope.query = "";
		//scope.acdb = window.localStorage.getItem("autoComplDB"),	
		//if(acdb !== null) acdb = acdb.split(",");
		connectToDB(function (db) {
			var transaction;
			transaction = db.transaction("acdbStore", "readonly");
			transaction.objectStore("acdbStore").mozGetAll().onsuccess = function(e){
				scope.acdb = e.target.result;
			};
		});
		scope.updateList = function () {
			addon.port.emit("search-query", scope.query);
			scope.updateAutocompleteDB();
			addon.port.on("search-result", function (videoData) {
				rootScope.$broadcast("updateList", {list: videoData});
			});
		};
			
		scope.updateAutocompleteDB = function () {
			//update autocomplete database
			var keywords = scope.query.split(" ");
			scope.acdb = (scope.acdb === null) ? scope.query.split(" ") : scope.acdb.concat(keywords);
			
			//window.localStorage.setItem("autoComplDB", scope.acdb);
			
			connectToDB(function (db) {
				var transaction;
				keywords.forEach(function(keyword, index, array){
					transaction = db.transaction("acdbStore", "readwrite");
					transaction.objectStore("acdbStore").put(keyword);
				});
				
			});
			
			previousReplace = null;
		};
		
		//autocomplete for last entered word
		scope.queryChanged =  function () {
			//if(scope.acdb === null) return;
			if(typeof scope.acdb === 'undefined') return;
			var keyword = scope.query.split(" ").pop();
			if(keyword.length < 3) {
				if(keyword.length == 2){
					previousReplace = null;
				}
				return;
			}
			scope.acdb.forEach(function (acWord, index, array) {
				if(acWord.substring(0,3) === keyword.substring(0,3)){
					if(acWord !== previousReplace){
						scope.query = scope.query.replace(keyword, acWord);
						previousReplace = acWord;
					}
				}
			});
		};
	}]);
	
	app.controller("searchResultsController", ['$scope', function (scope) {
		scope.detectedVideos = [];
		scope.$on("updateList", function (event, args) {
			scope.detectedVideos = args.list;
			scope.$apply();
		});
	}]);
})();
