angular.module('myApp').service('addressService', function($http) {
    var baseUrl = 'https://www.selida.com.br/avaliacaotecnica/api';
    var config = {
        headers: {
            'Chave': 'C5954C09-F8CF-4679-B52B-A74AA5EBCC55'
        }
    };

    this.getEndereco = function(enderecoId) {
        return $http.get(baseUrl + '/Endereco/' + enderecoId, config);
    };

    this.createEndereco = function(endereco) {
        return $http.post(baseUrl + '/Endereco', endereco, config);
    };

    this.updateEndereco = function(enderecoId, endereco) {
        return $http.put(baseUrl + '/Endereco/' + enderecoId, endereco, config);
    };

    this.deleteEndereco = function(enderecoId) {
        return $http.delete(baseUrl + '/Endereco/' + enderecoId, config);
    };

    this.getEnderecosByPessoa = function(pessoaId) {
        return $http.get(baseUrl + '/Endereco/GetAll/' + pessoaId, config);
    };
});
