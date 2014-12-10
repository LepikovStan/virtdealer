'use strict';

// Declare app level module which depends on views, and components
var myApp = angular
    .module('myApp', [
        'ngRoute'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/modules/common/templates/main.htm',
                controller: 'MainCtrl'
            })
            .when('/askquestion', {
                templateUrl: 'app/modules/common/templates/askquestion.htm',
                controller: 'MainCtrl'
            });
}]);

/* Controllers */
myApp.controller('MainCtrl',
    function($scope) {
        var tmpl = [
            'header',
            'carchoose',
            'comments',
            'footer'
        ];
		
        angular.extend($scope, {
			modules: {},
		});

        angular.forEach(tmpl, function(template) {
            $scope.modules[template] = {
				src: 'app/modules/'+template,
				template: 'app/modules/'+template+'/templates/'+template+'.htm',
			}
        });
    }
);