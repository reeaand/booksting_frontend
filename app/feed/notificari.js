'use strict';

angular.module('booksting').controller('Notif', function($scope, $http) {
    $scope.accepta = function(idd) {
        $http.post('http://localhost:8080/prietenie/accept?notif=' + idd).then(function successCallback(response) {
            console.log("ok accept");
        });
    };

    $scope.refuza = function(idd) {
        $http.post('http://localhost:8080/prietenie/refuz?notif=' + idd).then(function successCallback(response) {
            console.log("ok refuz");
        });
    };

    $http.get('http://localhost:8080/notif/notificari?username=' + localStorage.username).then(function (response) {
        $scope.cv = response.data;
        if ($scope.cv.toString() === "") {
            $scope.eroare = "Date invalide!";
        } else {
            console.log("aici");
            for(var i = 0; i < $scope.cv.length; i++) {
                document.getElementById('Notif').innerHTML += '<p> ' + $scope.cv[i].value + ":<br>" + $scope.cv[i].key.text + '</p>';
                if ($scope.cv[i].key.tip === "request") {
                    console.log($scope.cv[i].key.id);
                    let btnDa = document.createElement("BUTTON");
                    btnDa.innerHTML = "Accept";
                    btnDa.id = "Da"+$scope.cv[i].key.id;
                    //btnDa.onclick = "$scope.accepta("+$scope.cv[i].key.id+")";
                    document.getElementById('Notif').appendChild(btnDa);

                    let btnNu = document.createElement("BUTTON");
                    btnNu.innerHTML = "Refuz";
                    btnNu.id = "Nu"+$scope.cv[i].key.id;
                    btnNu.onclick = function () {
                        $scope.refuza($scope.cv[btnNu.id.substr(2)].key.id);
                    };
                    document.getElementById('Notif').appendChild(btnNu);

                }
            }
        }
    });
});


