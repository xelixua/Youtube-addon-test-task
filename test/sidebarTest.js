describe("searchController", function () {
	var controller, scope;
	beforeEach(module("sidebar-app"));
	
	 beforeEach(angular.mock.inject(function (_$controller_) {$controller = _$controller_;}));
    
	describe("updateAutocompleteDB", function () {        
		it("makes acdb from keywords if acdb is null", angular.mock.inject(function ($controller, $rootScope)  {
      		var $scope = $rootScope.$new();
            var controller = $controller('searchController', { $scope: $scope });
      		$scope.acdb = null;
      		$scope.query = "новый год";
      		$scope.updateAutocompleteDB();
      		expect($scope.acdb).toEqual(["новый", "год"]);
      		
		}));
		
		it("add keywords to acdb if it isn't null", angular.mock.inject(function ($controller)  {
      		var $scope = {};
            var controller = $controller('searchController', { $scope: $scope });
      		$scope.acdb = ["разные", "слова"];
      		$scope.query = "новый год";
      		$scope.updateAutocompleteDB();
      		expect($scope.acdb).toEqual(["разные", "слова", "новый", "год"]);
		}));
	});
	
	describe("queryChanged", function () {
        
		it("it doing nothing if autocomplete db is null", angular.mock.inject(function ($controller)  {
      		var $scope = {};
            var controller = $controller('searchController', { $scope: $scope });
      		$scope.acdb = undefined;
      		$scope.query = "нов";
      		$scope.queryChanged();
      		expect($scope.query).toEqual("нов");
		}));
		
		it("modifys нов to новый when that is in acdb", angular.mock.inject(function ($controller)  {
      		var $scope = {};
            var controller = $controller('searchController', { $scope: $scope });
      		$scope.acdb = ["новый"];
      		$scope.query = "нов";
      		$scope.queryChanged();
      		expect($scope.query).toEqual("новый");
		}));
	});
});
