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
                //controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'app/modules/common/templates/login.htm',
                //controller: 'MainCtrl'
            })
            .when('/askquestion', {
                templateUrl: 'app/modules/common/templates/askquestion.htm',
                //controller: 'MainCtrl'
            });

}]);

/* Controllers */
myApp.controller('MainCtrl',
    function($scope, $location, $route) {
        console.log('$route', $route)
        //$locationProvider.html5mode(true);
        var tmpl = [
                'header',
                'carchoose',
                'comments',
                'footer',
                'login'
            ],
            title = {
                '/': 'virtdealer',
                '/login': 'virtdealer - login'
            };

        angular.extend($scope, {
			modules: {},
		});

        angular.forEach(tmpl, function(template) {
            $scope.modules[template] = {
				src: 'app/modules/'+template,
				template: 'app/modules/'+template+'/templates/'+template+'.htm',
			}
        });

        $scope.bindBodyClick = function(event, target, cb) {
            $('body').on(event, function(e) {
                var $target = $(e.target);

                if ($target[0] !== target && !$target.closest('.popup').length) {
                    if ($.isFunction(cb)) {
                        cb();
                    }
                    $scope.$apply();

                    $('body').off(event);
                }
            });
        };

        document.title = title[$location.$$path];
    }
);