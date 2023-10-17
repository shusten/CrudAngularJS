angular.module('myApp').service('userService', function($http) {
    var baseUrl = 'https://www.selida.com.br/avaliacaotecnica/api';
    var config = {
        headers: {
            'Chave': 'C5954C09-F8CF-4679-B52B-A74AA5EBCC55'
        }
    };

    this.getUsers = function() {
        return $http.get(baseUrl + '/Pessoas/GetAll', config);
    };

    this.getUserById = function(userId) {
        return $http.get(baseUrl + '/Pessoas/' + userId, config);
    };

    this.createUser = function(user) {
        return $http.post(baseUrl + '/pessoas', user, config);
    };

    this.updateUser = function(userId, user) {
        return $http.put(baseUrl + '/Pessoas/' + userId, user, config);
    };

    this.deleteUser = function(userId) {
        return $http.delete(baseUrl + '/Pessoas/' + userId, config);
    };
});
