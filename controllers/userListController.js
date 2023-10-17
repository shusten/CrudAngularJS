angular.module('myApp').controller('UserListController', function($scope, $location, userService) {
    
    $scope.redirectToUserForm = function() {
        $location.path('/user-form');
    };

    $scope.redirectToUserFormById = function(userId) {
        $location.path('/user-form/' + userId);
    };

    function fetchUsers() {
        userService.getUsers()
        .then(function(response) {
            $scope.users = response.data.data;
            console.log($scope.users);
        })
        .catch(function(error) {
            console.error('Erro no get usuários:', error);
        });
    }

    $scope.deleteUser = function(userId) {
        userService.deleteUser(userId)
        .then(function(response) {
            console.log('Usuário excluído com sucesso');
            fetchUsers();
        })
        .catch(function(error) {
            console.error('Erro ao excluir o usuário:', error);
        });
    };

    $scope.fetchUserById = function(userId) {
        userService.getUserById(userId)
        .then(function(response) {
            console.log('fetchUserById', response);
            $scope.users = response.data.data;
            $scope.redirectToUserFormById(userId);
        })
        .catch(function(error) {
            console.error('Erro fetchUserById:', error);
        });
    };

    fetchUsers();
});