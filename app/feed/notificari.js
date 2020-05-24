'use strict';
function hello() {
    console.log('Hello');
}
angular.module('booksting').controller('Notif', function($scope, $http) {
    $scope.acceptaPr = function(idd) {
        $http.post('http://localhost:8080/prietenie/accept?notif=' + idd).then(function successCallback(response) {
            console.log("ok accept");
        });
    };

    $scope.refuzaPr = function(idd) {
        $http.post('http://localhost:8080/prietenie/refuz?notif=' + idd).then(function successCallback(response) {
            console.log("ok refuz");
        });
    };

    $scope.acceptaSting = function(idd) {
        $http.post('http://localhost:8080/sting/acceptat?idNotif=' + idd).then(function successCallback(response) {
            console.log("ok accept");
        });
    };

    $scope.refuzaSting = function(idd) {
        $http.post('http://localhost:8080/sting/refuz?idNotif=' + idd).then(function successCallback(response) {
            console.log("ok refuz");
        });
    };

    $http.get('http://localhost:8080/notif/notificari?username=' + localStorage.username).then(function (response) {
        $scope.cv = response.data;
        if ($scope.cv.toString() === "") {
            $scope.eroare = "Date invalide!";
        } else {
            $scope.cv.sort((a, b) => (a.key.id < b.key.id) ? 1 : -1);
            for(let i = 0; i < $scope.cv.length; i++) {
               var para = document.createElement('p');
               para.innerText = "De la " + $scope.cv[i].value + ": " + $scope.cv[i].key.text;
               document.getElementById('Notif').appendChild(para);
               if ($scope.cv[i].key.tip === "request") {

                    let btnDa = document.createElement("button");
                    btnDa.innerHTML = "Accept";
                    btnDa.id = $scope.cv[i].key.id;
                    if ($scope.cv[i].key.text.startsWith("Utilizatorul")) {
                        btnDa.onclick = (function() {
                            $scope.acceptaPr(this.id);
                        });
                    } else {
                        btnDa.onclick = (function() {
                            $scope.acceptaSting(this.id);
                        });
                    }
                    document.getElementById('Notif').appendChild(btnDa);
                    let btnNu = document.createElement("button");
                    btnNu.innerHTML = "Refuz";
                    btnNu.id = $scope.cv[i].key.id + 100;
                   if ($scope.cv[i].key.text.startsWith("Utilizatorul")) {
                       btnNu.onclick = (function() {
                           $scope.refuzaPr(this.id-100);
                       });
                   } else {
                       btnNu.onclick = (function() {
                           $scope.refuzaSting(this.id-100);
                       });
                   }
                    document.getElementById('Notif').appendChild(btnNu);

                }
            }

        }
    });
});


