var services = angular.module('errortest.services', ['ng']);


services.factory('AppServices', ['$http', function($http) {	
	
		return {

				getErrors: function() {
					console.log("In service getErrors");
					return $http({ 
			            method: 'GET',
			            url: 'http://localhost:8080/DTMProcessingService-2.1.0/api/errors/',
			            headers: { "Content-Type": 'application/json' }		         	
			       	})
			    },

			    getErrorCount: function() {
					console.log("In service getErrorCount");
					return $http({ 
			            method: 'GET',
			            url: 'http://localhost:8080/DTMProcessingService-2.1.0/api/errors/count',
			            headers: { "Content-Type": 'application/json' }		         	
			       	}) 
			    },

			    deleteError: function(body) {
					console.log("In service deleteError " + body);
					return $http({ 
			            method: 'DELETE',
			            url: 'http://localhost:8080/DTMProcessingService-2.1.0/api/errors/delete',
			            headers: { "Content-Type": 'application/json' },
			            data: body		         	
			       	})
			    },

			    continueError: function(body) {
					console.log("In service continue " + body.action);
					return $http({ 
			            method: 'POST',
			            url: 'http://localhost:8080/DTMProcessingService-2.1.0/api/errors/continue',
			            headers: { "Content-Type": 'application/json' },
			            data: body		         	
			       	})
			    }

			                         
		}
}]);