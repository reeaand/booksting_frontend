'use strict';

angular.module('booksting').controller('Profil', function($scope, $http) {
    $scope.username = localStorage.username;
    $scope.descriere = localStorage.descriere;

    $scope.updatare = function(numeNou, parola, descriere) {
        $http.post('http://localhost:8080/user/modifica?username=' + localStorage.username +
            '&numeNou=' + numeNou + '&parola=' +parola+'&descriere='+descriere).then(function (response) {
                location.href = '../feed/feed.html';
        });
    };
});

function faUpdate(numeNou, parola, descriere) {
    let scope = angular.element(document.getElementById("Profil")).scope();
    scope.$apply(function () {
        scope.updatare(numeNou, parola, descriere);
    });
}
