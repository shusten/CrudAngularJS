angular.module('myApp').controller('UserFormController', function($scope, $location, userService) {
    
    $scope.formData = {
        nome: '',
        dataNascimento: '',
        idade: '',
        email: '',
        telefone: '',
        celular: ''
    };

    $scope.redirectToHome = function() {
        $location.path('/');
    };

    $scope.$watch('formData', function(newData, oldData) {
        console.log('form data changed:', newData);
    }, true);

    $scope.submitFormUser = function() {
        $scope.formData.idade = Number($scope.formData.idade);
        userService.createUser($scope.formData)
        .then(function(response) {
        console.log('Post response:', response);
        })
        .catch(function(error) {
            console.error('Erro ao criar o usuário:', error);
        });
    };
});