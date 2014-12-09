'use strict';

// Declare app level module which depends on views, and components
var myApp = angular
			.module('myApp', [
			  'ngRoute'
			])
			.config(['$routeProvider', function($routeProvider) {
				$routeProvider
					.when('/', {
						templateUrl: 'app/templates/pages/main.htm',
						controller: 'MainCtrl'
					})
					.when('/askquestion', {
						templateUrl: 'app/templates/pages/askquestion.htm',
						controller: 'MainCtrl'
					});
			}]);

/* Controllers */
myApp.controller('MainCtrl',
	function($scope) {
		$scope.templates = {
			header: 'app/templates/modules/header.htm',
			carChoose: 'app/templates/modules/carChoose.htm',
			comments: 'app/templates/modules/comments.htm',
			footer: 'app/templates/modules/footer.htm'
		}
	}
);