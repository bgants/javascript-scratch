var app = angular.module('errortest', ['errortest.services','ngRoute','ui.bootstrap']);

app.controller('ServiceCtrl', ['$rootScope', '$scope', 'AppServices', '$modal',  function($scope, $rootScope, AppServices, $modal) {
	
	console.log("In controller");	

	
	$scope.getErrors = function() {	
		console.log("In controller getErrors");			
		AppServices.getErrors().then( function successCallback(response) {		
			$scope.errorListResults = response.data;		
			console.log(response.data);		
			$scope.theErrorCount = $scope.getErrorCount();
			
			
    	}, function errorCallback(response) {
			console.log(response);
		});
	},

	$scope.getErrorCount = function() {	
		console.log("In controller getErrorCount");			
		AppServices.getErrorCount().then( function successCallback(response) {		
			$scope.count = response.data;		
			console.log(response.data);		               
    	}, function errorCallback(response) {
			console.log(response);
		});
	},

	$scope.deleteError = function() {	
		console.log("In controller clearErrors");			
		AppServices.clearErrors().then( function successCallback(response) {		
			$scope.errorListResults = [];					               
    	}, function errorCallback(response) {
			console.log(response);
		});
	},

	$scope.deleteError = function(body) {
		AppServices.deleteError(body).then( function successCallback(response) {		
			console.log(response.data);		
		}, function errorCallback(response) {
			console.log(response);
		});
	},

	$scope.continueError =function(body) {
		console.log("Calling action " + $scope.action.name );
      	AppServices.continueError(body).then( function successCallback(response) {		
			console.log(response.data);		
		}, function errorCallback(response) {
			console.log(response);
		});  
    },

	$scope.setSelectedError = function(error) {	
		$scope.selected = error;
		console.log("Selected Error is " + error.aircraftId);

		var modalInstance = $modal.open({							
      		templateUrl: 'app/templates/modalTemplate.html',
	      	controller: 'ModalInstanceCtrl',
	      	resolve: {
		        error: function () {
		          	return $scope.selected;
		      	},
		      	errorResult: function() {	      		      		
		      		return $scope.errorResults;
		      	}		      	
	        }	           	 	   
    	}); 

		$scope.action = {
			name: 'none'			
		};
		
    	modalInstance.result.then(function (selectedItem) {
      		$scope.selected = selectedItem;
      		console.log("In modalInstanceThen " + selectedItem.aircraftId);
      		console.log('Modal controller : ' + $scope.action.name);

      		if( $scope.action.name === "delete" ) {
      			body = {
      				"action":"delete", 
					"aircraftId":selectedItem.aircraftId, 
					"fileName": selectedItem.filename
      			}
      			console.log("Calling Delete");
      			$scope.deleteError(JSON.stringify(body));
      		} else {
      			console.log("calling resubmit with " +  $scope.action.name ) 
      			$scope.continueIsVisitorOverride = false;
      			body = {
      				"action":"continueIsVisitorOverride", 
					"aircraftId":selectedItem.aircraftId, 
					"fileName": selectedItem.filename
      			}
      			$scope.continueError(JSON.stringify(body));      			 		
      		}
      		$scope.theErrorCount = $scope.getErrorCount();
			$scope.errorListResults = $scope.getErrors();
      		
    	}, function () {
      		console.log('Modal dismissed at: ' + new Date());
    	});		
		
	}	
	$scope.theErrorCount = $scope.getErrorCount();
	$scope.errorListResults = $scope.getErrors();

}]);

/*
	ModalInstanceCtrl  - modal instance controller. 	
*/
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'error', function($scope, $modalInstance, error) {

	console.log("In modalInstanceCTRL " + error.aircraftId);
	$scope.error = error;	
	
	$scope.ok = function () {		
		//send back to modalInstance in ServiceCtrl (above) which will inoke some services ervice.
		$modalInstance.close(error);
	};

	$scope.cancel = function () {
		console.log("cancel");
		//Just cancel and move onto something else.
		$modalInstance.dismiss();
	};
}]);