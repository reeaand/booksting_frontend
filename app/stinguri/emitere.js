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
                console.log("mor");
            $scope.prieteni = response.data;
            if($scope.prieteni.length == 0) return;
            let select1 = document.getElementById('flowers');
            for (let i = 0; i < $scope.prieteni.length; i++) {
                console.log(i);
                let opt1 = document.createElement('option');
                console.log($scope.prieteni[i]);
                opt1.value = $scope.prieteni[i].username;
                opt1.innerHTML = $scope.prieteni[i].username;
                select1.appendChild(opt1);
            }
        });
});
