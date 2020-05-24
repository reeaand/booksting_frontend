'use strict';

angular.module('booksting').controller('User', function($scope, $http) {
    $http.get('http://localhost:8080/user/searched?username=' + localStorage.flower).then(function (response) {
        $scope.flower = response.data;
        localStorage.catre = $scope.flower.username;
    });
});

angular.module('booksting').controller('Promotion', function($scope, $http) {
    $scope.promotie = function(nivel) {
        $http.post('http://localhost:8080/user/promotion?promoter=' + localStorage.username + '&username=' + localStorage.flower+
        "&nivel=" + nivel).then(function successCallback(response) {

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
    scope.$apply(function () {
        scope.promotie(nivel);
    });
}

angular.module('booksting').controller('CererePrietenie', function($scope, $http) {
    $scope.cererePrietenie = function() {
        $http.post('http://localhost:8080/notif/friendRequest?username=' + localStorage.username +
            '&toName=' + localStorage.flower).then(function successCallback(response) {
                $scope.mesaj = "Cerere de prietenie trimisa!"
        }, function errorCallback(response) {
            $scope.mesaj ="Sunteti deja prieteni!";
        });
    };
    $http.get('http://localhost:8080/prietenie/suntPrieteni?id1=' + localStorage.idUser +
        '&id2=' + localStorage.idFlower).then(function successCallback(response) {
            console.log(response.data);
            if(response.data === true) return;
            console.log(localStorage.idFlower + " " + localStorage.idUser);
        let btn = document.createElement("BUTTON");
        btn.innerHTML = "Cere prietenia";
        btn.id = "cerere";
        btn.onclick = $scope.cererePrietenie;
        btn.className = "butoane";
        document.getElementById('CererePrietenie').appendChild(btn);
    });
});

function cerere() {
    let scope = angular.element(document.getElementById("CererePrietenie")).scope();
    scope.$apply(function () {
        scope.cererePrietenie();
    });
}

angular.module('booksting').controller('StergeUser', function($scope, $http) {
    $scope.sterge = function() {
        $http.get('http://localhost:8080/user/sterge?username=' + localStorage.flower).then(function (response) {
            location.href = "../feed/feed.html";

        });
    };
});

function deSters() {
    let scope = angular.element(document.getElementById("StergeUser")).scope();
    scope.$apply(function () {
        scope.sterge();
    });
}
