angular.module('myApp').controller('UserFormController', function ($routeParams, $location, userService, addressService) {
    var vm = this;

    vm.formData = {
        nome: '',
        dataNascimento: new Date(''),
        idade: '',
        email: '',
        telefone: '',
        celular: ''
    };

    vm.addressFormData = {
        pessoaId: 1,
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: ''
    };

    vm.editMode = false;
    var userId = $routeParams.userId;
    var addressId = 0;

    vm.redirectToHome = redirectToHome;
    vm.submitFormUser = submitFormUser;
    vm.addAddress = addAddress;
    vm.fillAddressForm = fillAddressForm;
    vm.updateAddress = updateAddress;
    vm.deleteAddress = deleteAddress;
    vm.checkIdToAddAddress = checkIdToAddAddress;
    vm.openSaveUserModal = openSaveUserModal;
    vm.closeSaveUserModal = closeSaveUserModal;
    vm.saveUser = saveUser;

    // Inicialização
    console.log('Chamou fora');
    
    if (userId) {
        console.log('Chamou inicialização');
        userService.getUserById(userId)
        .then(function (response) {
            var userData = response.data.data;
            vm.formData = userData;
            getAllAddress();
        })
        .catch(function (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        });
    }

    // Outras funções
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
        vm.formData.idade = Number(vm.formData.idade);
        userService.createUser(vm.formData)
        .then(function (response) {
            console.log('Post response:', response);
            redirectToHome();
        })
        .catch(function (error) {
            console.error('Erro ao criar o usuário:', error);
        });
    }

    function updateUser() {
        vm.formData.idade = Number(vm.formData.idade);
        userService.updateUser(userId, vm.formData)
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
            vm.addressData = addressData;
        })
        .catch(function (error) {
            console.error('Erro ao buscar endereço:', error);
        });
    }

    function addAddress() {
        var novoEndereco = {
            pessoaId: parseInt(userId),
            logradouro: vm.addressFormData.logradouro,
            numero: vm.addressFormData.numero,
            bairro: vm.addressFormData.bairro,
            cidade: vm.addressFormData.cidade,
            uf: vm.addressFormData.uf
        };

        addressService.createAddress(novoEndereco)
        .then(function (response) {
            vm.addressFormData.logradouro = '';
            vm.addressFormData.numero = '';
            vm.addressFormData.bairro = '';
            vm.addressFormData.cidade = '';
            vm.addressFormData.uf = '';

            getAllAddress();
            //openSaveUserModal();
        })
        .catch(function (error) {
            console.error('Erro ao adicionar endereço:', error);
        });
    }

    function fillAddressForm(address) {
        vm.addressFormData.logradouro = address.logradouro;
        vm.addressFormData.numero = address.numero;
        vm.addressFormData.bairro = address.bairro;
        vm.addressFormData.cidade = address.cidade;
        vm.addressFormData.uf = address.uf;

        addressId = address.enderecoId;
        vm.editMode = true;
    }

    function updateAddress() {
        var enderecoAtualizado = {
            logradouro: vm.addressFormData.logradouro,
            numero: parseInt(vm.addressFormData.numero),
            bairro: vm.addressFormData.bairro,
            cidade: vm.addressFormData.cidade,
            uf: vm.addressFormData.uf
        };

        addressService.updateAddress(addressId, enderecoAtualizado)
        .then(function (response) {
            vm.addressFormData = {
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                uf: ''
            };

            vm.editMode = false;
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
        vm.formData.idade = Number(vm.formData.idade);
        userService.createUser(vm.formData)
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
