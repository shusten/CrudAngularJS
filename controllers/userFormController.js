angular.module('myApp').controller('UserFormController', function ($scope, $routeParams, $location, userService, addressService) {
    $scope.formData = {
        nome: '',
        dataNascimento: new Date(''),
        idade: '',
        email: '',
        telefone: '',
        celular: ''
    };

    $scope.addressFormData = {
        pessoaId: 1,
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: ''
    };

    $scope.editMode = false;
    var userId = $routeParams.userId;
    var addressId = 0

    if (userId) {
        userService.getUserById(userId)
        .then(function (response) {
            var userData = response.data.data;
            $scope.formData = userData;
            getAllAddress();
        })
        .catch(function (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        });
    }

    $scope.redirectToHome = function () {
        $location.path('/');
    };

    $scope.submitFormUser = function () {
        if (userId) {
            updateUser();
        } else {
            createUser();
        }
    };

    $scope.$watch('addressFormData', function(newData, oldData) {
        console.log('form data changed:', newData);
    }, true);

    function createUser() {
        $scope.formData.idade = Number($scope.formData.idade);
        userService.createUser($scope.formData)
        .then(function (response) {
            console.log('Post response:', response);
            $scope.redirectToHome();
        })
        .catch(function (error) {
            console.error('Erro ao criar o usuário:', error);
        });
    }

    function updateUser() {
        $scope.formData.idade = Number($scope.formData.idade);
        userService.updateUser(userId, $scope.formData)
        .then(function (response) {
            console.log('Atualização feita com sucesso:', response);
            $scope.redirectToHome();
        })
        .catch(function (error) {
            console.error('Erro na atualização:', error);
        });
    };

    function getAllAddress() {
        addressService.getAddressByUser(userId)
        .then(function (response) {
            var addressData = response.data.data;
            $scope.addressData = addressData;
        })
        .catch(function (error) {
            console.error('Erro ao buscar endereço:', error);
        });
    }

    $scope.addAddress = function () {
        var novoEndereco = {
            pessoaId: parseInt(userId),
            logradouro: $scope.addressFormData.logradouro,
            numero: $scope.addressFormData.numero,
            bairro: $scope.addressFormData.bairro,
            cidade: $scope.addressFormData.cidade,
            uf: $scope.addressFormData.uf
        };
    
        addressService.createAddress(novoEndereco)
            .then(function (response) {

            $scope.addressFormData.logradouro = '';
            $scope.addressFormData.numero = '';
            $scope.addressFormData.bairro = '';
            $scope.addressFormData.cidade = '';
            $scope.addressFormData.uf = '';

            getAllAddress();
        })
        .catch(function (error) {
            console.error('Erro ao adicionar endereço:', error);
        });
    }

    $scope.fillAddressForm = function (address) {
        $scope.addressFormData.logradouro = address.logradouro;
        $scope.addressFormData.numero = address.numero;
        $scope.addressFormData.bairro = address.bairro;
        $scope.addressFormData.cidade = address.cidade;
        $scope.addressFormData.uf = address.uf;
        
        addressId = address.enderecoId
        $scope.editMode = true;
    };

    $scope.updateAddress = function () {
        var enderecoAtualizado = {
            logradouro: $scope.addressFormData.logradouro,
            numero: $scope.addressFormData.numero,
            bairro: $scope.addressFormData.bairro,
            cidade: $scope.addressFormData.cidade,
            uf: $scope.addressFormData.uf
        };
    
        addressService.updateAddress(addressId, enderecoAtualizado)
        .then(function (response) {

            $scope.addressFormData = {
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                uf: ''
            };

            $scope.editMode = false;
            getAllAddress();
        })
        .catch(function (error) {
            console.error('Erro ao atualizar o endereço:', error);
        });
    }

    $scope.deleteAddress = function (enderecoId) {
        addressService.deleteAddress(enderecoId)
        .then(function (response) {
            console.log('delete response:', response);
            getAllAddress();
        });
    }
});
