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
    var addressId = 0;

    $scope.redirectToHome = redirectToHome;
    $scope.submitFormUser = submitFormUser;
    $scope.addAddress = addAddress;
    $scope.fillAddressForm = fillAddressForm;
    $scope.updateAddress = updateAddress;
    $scope.deleteAddress = deleteAddress;
    $scope.checkIdToAddAddress = checkIdToAddAddress;
    $scope.openSaveUserModal = openSaveUserModal;
    $scope.closeSaveUserModal = closeSaveUserModal;
    $scope.saveUser = saveUser;
    
    if (userId) {
        console.log('Chamou inicialização');
        userService.getUserById(userId)
        .then(function (response) {
            var userData = response.data.data;
            $scope.formData = userData;
            $scope.formData.dataNascimento = new Date($scope.formData.dataNascimento);
            getAllAddress();
        })
        .catch(function (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        });
    }

    function redirectToHome() {
        $location.path('/');
    }

    function submitFormUser() {
        console.log('Chamou submitformuser');
        if (userId) {
            updateUser();
        } else {
            createUser();
        }
    }

    function createUser() {
        $scope.formData.idade = Number($scope.formData.idade);
        userService.createUser($scope.formData)
        .then(function (response) {
            console.log('Post response:', response);
            redirectToHome();
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
            redirectToHome();
        })
        .catch(function (error) {
            console.error('Erro na atualização:', error);
        });
    }

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

    
    function addAddress() {
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

    function fillAddressForm(address) {
        $scope.addressFormData.logradouro = address.logradouro;
        $scope.addressFormData.numero = address.numero;
        $scope.addressFormData.bairro = address.bairro;
        $scope.addressFormData.cidade = address.cidade;
        $scope.addressFormData.uf = address.uf;

        addressId = address.enderecoId;
        $scope.editMode = true;
    }

    function updateAddress() {
        var enderecoAtualizado = {
            logradouro: $scope.addressFormData.logradouro,
            numero: parseInt($scope.addressFormData.numero),
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

    function deleteAddress(enderecoId) {
        addressService.deleteAddress(enderecoId)
        .then(function (response) {
            console.log('delete response:', response);
            getAllAddress();
        });
    }

    function checkIdToAddAddress() {
        if (userId) {
            addAddress();
        } else {
            openSaveUserModal();
        }
    }

    function openSaveUserModal() {
        $('#saveUserModal').modal('show');
    }

    function closeSaveUserModal() {
        $('#saveUserModal').modal('hide');
    }

    function saveUser() {
        $scope.formData.idade = Number($scope.formData.idade);
        userService.createUser($scope.formData)
        .then(function (response) {
            getUserToAddAddress();
        })
        .catch(function (error) {
            console.error('Erro ao criar o usuário:', error);
        });
    }

    function getUserToAddAddress() {
        userService.getUsers()
        .then(function(response) {
            pessoas = response.data.data;
            userId = pessoas.pop().pessoaId;
            closeSaveUserModal();
            $location.path('/user-form/' + userId);
        })
        .catch(function(error) {
            console.error('Erro no get usuários:', error);
        });
    }
});
