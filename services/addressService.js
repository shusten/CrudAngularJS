angular.module('myApp').service('addressService', function($http) {
    var baseUrl = 'https://www.selida.com.br/avaliacaotecnica/api';
    var config = {
        headers: {
            'Chave': 'C5954C09-F8CF-4679-B52B-A74AA5EBCC55'
        }
    };

    this.getAddress = function(addressId) {
        return $http.get(baseUrl + '/Endereco/' + addressId, config);
    };

    this.createAddress = function(address) {
        return $http.post(baseUrl + '/Endereco', address, config);
    };

    this.updateAddress = function(addressId, address) {
        return $http.put(baseUrl + '/Endereco/' + addressId, address, config);
    };

    this.deleteAddress = function(addressId) {
        return $http.delete(baseUrl + '/Endereco/' + addressId, config);
    };

    this.getAddressByUser = function(userId) {
        return $http.get(baseUrl + '/Endereco/GetAll/' + userId, config);
    };
});
