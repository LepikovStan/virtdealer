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
    function($scope, $location) {
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
'use strict';

/* Controllers */
myApp.controller('CarChooseCtrl',
    function($scope, $rootScope) {
        var enabledSteps = ['step1'],
            carBrands = [
                {
                    id: 1,
                    name: 'Acura',
                    icon: $scope.modules.carchoose.src + '/i/i.auto.alfaromeo.png'
                },
                {
                    id: 2,
                    name: 'Alfa Romeo',
                    icon: $scope.modules.carchoose.src + '/i/i.auto.astonmartin.png'
                },
                {
                    id: 3,
                    name: 'Aston Martin',
                    icon: $scope.modules.carchoose.src + '/i/i.auto.alfaromeo.png'
                },
                {
                    id: 4,
                    name: 'Audi',
                    icon: $scope.modules.carchoose.src + '/i/i.auto.astonmartin.png'
                }
            ],
            carMakes = {
                'Acura': [
                    { name: 'Acura 1', id: 1 },
                    { name: 'Acura 2', id:2 },
                    { name: 'Acura 3', id: 3 }
                ],
                'Alfa Romeo': [
                    { name: 'Alfa Romeo 1', id: 1 },
                    { name: 'Alfa Romeo 2', id:2 },
                    { name: 'Alfa Romeo 3', id: 3 }
                ],
                'Aston Martin': [
                    { name: 'Aston Martin 1', id: 1 },
                    { name: 'Aston Martin 2', id:2 },
                    { name: 'Aston Martin 3', id: 3 }
                ],
                'Audi': [
                    { name: 'Audi 1', id: 1 },
                    { name: 'Audi 2', id: 2 },
                    { name: 'Audi 3', id: 3 }
                ]
            },
            regionsMain = [
                { name: 'Москва', id: 'msc' },
                { name: 'Санкт-Петербург', id: 'spb' }
            ],
            regions = [
                { name: 'Республика Адыгея', id: 'adyg' },
                { name: 'Республика Башкортостан', id: 'basc' },
                { name: 'Республика Бурятия', id: 'bur' },
                { name: 'Республика Дагестан', id: 'dag' }
            ];

        angular.extend($scope, {
            step1class: 'step',
            step2class: 'step disabled',
            step3class: 'step disabled',
            carBrands: carBrands,
            carBrandTitle: 'Выберите марку',
            carMakeTitle: 'Выбрать модель',
            carRegionTitle: 'Выбрать регион',
            carMakes: carMakes['Acura'],
            regionsMain: regionsMain,
            regions: regions
        });

        function openChoosePopup(e, step) {
            if ($.inArray(step, enabledSteps) === -1) {
                return false;
            }

            $scope[step + 'class'] = 'step open';

            $scope.bindBodyClick('click.' + step, e.target, function() {
                $scope[step + 'class'] = 'step';
            });
        }

        $scope.openChooseBrandPopup = function(e) {
            openChoosePopup(e, 'step1');
        }

        $scope.chooseBrand = function(e) {
            enabledSteps.push('step2');
            $scope.step1class = 'step';
            $scope.step2class = 'step';
            $scope.carBrandTitle = e.target.dataset.name;
            $scope.carBrandId = e.target.dataset.val;
        }

        $scope.openChooseModelPopup = function(e) {
            openChoosePopup(e, 'step2');

            $scope.carMakes = carMakes[$scope.carBrandTitle];
        }

        $scope.chooseMake = function(e) {
            enabledSteps.push('step3');
            $scope.step2class = 'step';
            $scope.step3class = 'step';
            $scope.carMakeTitle = e.target.dataset.name;
            $scope.carMakeId = e.target.dataset.val;
        }

        $scope.openChooseRegionPopup = function(e) {
            openChoosePopup(e, 'step3');
        }

        $scope.chooseRegion = function(e) {
            $scope.step3class = 'step';
            $scope.carRegionTitle = e.target.dataset.name;
            $scope.carRegionId = e.target.dataset.val;
        }
    }
);