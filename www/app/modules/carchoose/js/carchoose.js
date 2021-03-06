﻿'use strict';

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
        };

        $scope.openChooseBrandPopup = function(e) {
            openChoosePopup(e, 'step1');
        };

        $scope.chooseBrand = function(e) {
			var brandName = e.target.dataset.name,
				brandVal = e.target.dataset.val;
		
            enabledSteps.push('step2');
            $scope.step1class = 'step';
            $scope.step2class = 'step';
			
			if ($scope.carBrandTitle !== brandName && $scope.carMakeTitle !== 'Выбрать модель') {
				enabledSteps = ['step1', 'step2'];
				$scope.step3class = 'step disabled';
				$scope.carMakeTitle = 'Выбрать модель'
			}
			
			$scope.carBrandTitle = brandName;
			$scope.carBrandId = brandVal;
        };

        $scope.openChooseModelPopup = function(e) {
            openChoosePopup(e, 'step2');

            $scope.carMakes = carMakes[$scope.carBrandTitle];
        };

        $scope.chooseMake = function(e) {
            enabledSteps.push('step3');
            $scope.step2class = 'step';
            $scope.step3class = 'step';
            $scope.carMakeTitle = e.target.dataset.name;
            $scope.carMakeId = e.target.dataset.val;
        };

        $scope.openChooseRegionPopup = function(e) {
            openChoosePopup(e, 'step3');
        };

        $scope.chooseRegion = function(e) {
            $scope.step3class = 'step';
            $scope.carRegionTitle = e.target.dataset.name;
            $scope.carRegionId = e.target.dataset.val;
        };
    }
);