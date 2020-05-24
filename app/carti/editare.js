'use strict';

angular.module('booksting').controller('EditamCarte', function($scope, $http) {
    $http.get('http://localhost:8080/carte/searchCarte?nume=' + localStorage.carte).then(function (response) {
        $scope.carte = response.data;
        console.log("intra");
    });
    $scope.updatare = function(nume, autor, pagini, an, coperta, descriere) {
        $http.post('http://localhost:8080/carte/modifica?username=' + localStorage.username +
            '&nume=' + localStorage.carte + '&numeNou=' +nume + '&autor=' +autor + '&an='+an +
            '&descriere=' + descriere + '&pagini=' +pagini + '&coperta='+coperta
        ).then(function (response) {
            console.log(coperta);
            location.href = '../feed/feed.html';
            localStorage.carte = nume;
        });
    };
});

function faUpdate(nume, autor, pagini, an, coperta, descriere) {
    let scope = angular.element(document.getElementById("EditamCarte")).scope();
    scope.$apply(function () {
        scope.updatare(nume, autor, pagini, an, coperta, descriere);
    });
}
