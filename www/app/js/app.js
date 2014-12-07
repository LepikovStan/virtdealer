'use strict';

// Declare app level module which depends on views, and components
var myApp = angular
			.module('myApp', [
			  'ngRoute',
			  'ui.router'
			])
			.config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {
				$routeProvider.
					when('/', {
						templateUrl: 'app/templates/main.htm',
						controller: 'MainCtrl'
					});
					
				$stateProvider
					.state('header', {
						url: "/",
						views: {
							"header": { template: "app/templates/header.htm" }
						}
					});
			}]);

/* Controllers */

myApp.controller('MainCtrl',
  function($scope) {
	console.log('aeae')
  }
);