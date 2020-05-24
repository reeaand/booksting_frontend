'use strict';

angular.module('booksting').controller('Emite', function($scope, $http) {
    $scope.emiteSting = function() {
        location.href = "../stinguri/emiteSting.html";
    };
});

function emiteUnSting() {
    let scope = angular.element(document.getElementById("Emite")).scope();
    scope.$apply(function () {
        scope.emiteSting();
    });
}

angular.module('booksting').controller('StingNou', function($scope, $http) {
    $scope.nou = function(carte, flower, zile) {
        $http.post('http://localhost:8080/notif/stingRequest?carte=' + carte +
        "&flower=" + flower +
        "&bee=" + localStorage.username +
        "&zile=" + zile).then(function successCallback(response) {
            console.log("sting nou");
        });
    };
});

function trimiteSting() {
    let zile = document.getElementById('zi').value;
    let flower = document.getElementById('flowers').value;
    let carte = document.getElementById('carti').value;
    console.log(zile, flower, carte);
    let scope = angular.element(document.getElementById("StingNou")).scope();
    scope.$apply(function () {
        scope.nou(carte, flower, zile);
    });
}

function sendSting(carte, flower, zile) {
    let scope = angular.element(document.getElementById("StingNou")).scope();
    scope.$apply(function () {
        scope.nou(carte, flower, zile);
    });
}

angular.module('booksting').controller('ListaPrieteni', function($scope, $http) {
    console.log("aci");
        $http.get('http://localhost:8080/prietenie/listaPrieteni?username=' +localStorage.username)
            .then(function successCallback(response) {
                $scope.prieteni = response.data;
                if($scope.prieteni.length == 0) return;
                let select1 = document.getElementById('flowers');
                for (let i = 0; i < $scope.prieteni.length; i++) {
                    let opt1 = document.createElement('option');
                    opt1.value = $scope.prieteni[i].username;
                    opt1.innerHTML = $scope.prieteni[i].username;
                    select1.appendChild(opt1);
                }
            });
});

angular.module('booksting').controller('ListaCarti', function($scope, $http) {
    console.log("aci");
    $http.get('http://localhost:8080/carte/all?username=' +localStorage.username)
        .then(function successCallback(response) {
            $scope.carti = response.data;
            if($scope.carti.length == 0) return;
            let select1 = document.getElementById('carti');
            for (let i = 0; i < $scope.carti.length; i++) {
                console.log(i);
                let opt1 = document.createElement('option');
                opt1.value = $scope.carti[i].nume;
                opt1.innerHTML = $scope.carti[i].nume;
                select1.appendChild(opt1);
            }
        });
});
