angular.module('myApp').service('userService', function($http) {
    var baseUrl = 'https://www.selida.com.br/avaliacaotecnica/api';
    var config = {
        headers: {
            'Chave': '2BB44D7A-2743-4D3E-8107-00BA51B7E05F'
        }
    };

    this.getUsers = function() {
        return $http.get(baseUrl + '/Pessoas/GetAll', config);
    };

    this.getUserById = function(userId) {
        return $http.get(baseUrl + '/users/' + userId);
    };

    this.createUser = function(user) {
        return $http.post(baseUrl + '/pessoas', user, config);
    };

    this.updateUser = function(userId, user) {
        return $http.put(baseUrl + '/users/' + userId, user);
    };

    this.deleteUser = function(userId) {
        return $http.delete(baseUrl + '/Pessoas/' + userId, config);
    };
});
