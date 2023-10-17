angular.module('myApp').controller('UserFormController', function($scope, $routeParams, $location, userService, $filter) {
    
    $scope.formData = {
        nome: '',
        dataNascimento: new Date(''),
        idade: '',
        email: '',
        telefone: '',
        celular: ''
    }; 

    var userId = $routeParams.userId;

    function formatDate(date) {
        return $filter('date')(date, 'yyyy-MM-dd');
    }

    function populateFormWithUserData(userData) {
        $scope.formData = {
            nome: userData.nome,
            dataNascimento: formatDate(userData.dataNascimento),
            idade: userData.idade,
            email: userData.email,
            telefone: userData.telefone,
            celular: userData.celular
        };
    }

    if (userId) {
        userService.getUserById(userId)
        .then(function(response) {
            var userData = response.data.data;
            populateFormWithUserData(userData);
        })
        .catch(function(error) {
            console.error('Erro ao buscar dados do usuário:', error);
        });
    }

    $scope.redirectToHome = function() {
        $location.path('/');
    };

    $scope.$watch('formData', function(newData, oldData) {
        console.log('form data changed:', newData);
    }, true);
    
    $scope.submitFormUser = function() {
        if (userId) {
            updateUser();
        } else {
            createUser();
        }
    };

    createUser = function() {
        $scope.formData.idade = Number($scope.formData.idade);
        userService.createUser($scope.formData)
        .then(function(response) {
        console.log('Post response:', response);
        $scope.redirectToHome();
        })
        .catch(function(error) {
            console.error('Erro ao criar o usuário:', error);
        });
    };

    updateUser = function() {
        $scope.formData.idade = Number($scope.formData.idade);
        userService.updateUser(userId, $scope.formData)
        .then(function(response) {
            console.log('Atualização feita com sucesso:', response);
            $scope.redirectToHome();
        })
        .catch(function(error) {
            console.error('Erro na atualização:', error);
        });
    };

});