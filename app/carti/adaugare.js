'use strict';

angular.module('booksting').controller('AdaugaCarte', function($scope, $http) {
    $scope.adaugare = function(nume, autor, pagini, an, coperta, descriere) {
        $http.post('http://localhost:8080/carte/insert?username=' + localStorage.username +
            '&nume=' + nume + '&autor=' +autor + '&an='+an +
            '&descriere=' + descriere + '&pagini=' +pagini + '&coperta='+coperta
        ).then(function (response) {
            console.log(coperta);
            location.href = '../feed/feed.html';
            localStorage.carte = nume;
        });
    };
});

function faUpdate(nume, autor, pagini, an, coperta, descriere) {
    let scope = angular.element(document.getElementById("AdaugaCarte")).scope();
    scope.$apply(function () {
        scope.adaugare(nume, autor, pagini, an, coperta, descriere);
    });
}
