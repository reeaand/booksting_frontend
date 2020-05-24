'use strict';

angular.module('booksting').controller('Carte', function($scope, $http) {
    $http.get('http://localhost:8080/carte/searchCarte?nume=' + localStorage.carte).then(function (response) {
        $scope.carte = response.data;
        localStorage.carte = $scope.carte.nume;
        var img = new Image();
        img.src = $scope.carte.coperta;
        img.width = 200;
        console.log(img.src);
        document.getElementById('Carte1').appendChild(img);
    });
});

function getImage() {
    let scope = angular.element(document.getElementById("Carte1")).scope();
    console.log(scope);
    scope.$apply(function () {
        scope.imagine();
    });
}

angular.module('booksting').controller('EditareCarte', function($scope, $http) {
    $scope.sterge = function() {
        $http.get('http://localhost:8080/carte/sterge?username' + localStorage.username +
            '&nume=' + localStorage.carte).then(function (response) {
                location.href = '../';
        });
    };

    $scope.editeaza = function() {
        location.href = 'editeaza.html';
    };

        if (localStorage.nivel == 3) return;
        let btnEditare = document.createElement("button");
        btnEditare.innerHTML = "Editeaza cartea";
        btnEditare.id = 'editez';
        btnEditare.className ="butoane";
        btnEditare.onclick = (function() {
                $scope.editeaza();
        });
        document.getElementById('EditareCarte').appendChild(btnEditare);
        if (localStorage.nivel != 1) return;
        let btnStergere = document.createElement("button");
        btnStergere.innerHTML = "Sterge cartea";
        btnStergere.className ="butoane";
        btnStergere.id = 'editez';
        btnStergere.onclick = (function() {
            $scope.editeaza();
        });
        document.getElementById('EditareCarte').appendChild(btnStergere);
});




