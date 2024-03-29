angular.module('myApp').config(function($routeProvider) {
    $routeProvider
    .when('/user-form', {
        templateUrl: 'templates/user-form.html',
        controller: 'UserFormController'
    })
    .when('/user-list', {
        templateUrl: 'templates/user-list.html',
        controller: 'UserListController'
    })
    .when('/user-form/:userId', {
        templateUrl: 'templates/user-form.html',
        controller: 'UserFormController'
    })
    .otherwise({
        redirectTo: '/user-list'
    });
});
