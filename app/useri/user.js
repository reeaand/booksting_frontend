'use strict';

angular.module('booksting').controller('User', function($scope, $http) {
    $http.get('http://localhost:8080/user/searched?username=' + localStorage.flower).then(function (response) {
        $scope.flower = response.data;
    });
});

angular.module('booksting').controller('Promotion', function($scope, $http) {
    $scope.promotie = function(nivel) {
        $http.post('http://localhost:8080/user/promotion?promoter=' + localStorage.username + '&username=' + localStorage.flower+
        "&nivel=" + nivel).then(function successCallback(response) {

            $scope.flower = response.data;
            $scope.mesaj = "Userul a fost promovat!";
            $scope.eroare = "";
        }, function errorCallback(response) {
            $scope.eroare = "Userul nu poate fi promovat!";
            $scope.mesaj ="";
        });
    };
});

function promovare(nivel) {
    let scope = angular.element(document.getElementById("Promotion")).scope();

    console.log(nivel);
    scope.$apply(function () {
        console.log(nivel);
        scope.promotie(nivel);
    });
}
