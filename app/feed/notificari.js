'use strict';
angular.module('booksting').controller('Notif', function($scope, $http) {
    $scope.acceptaPr = function(idd) {
        $http.post('http://localhost:8080/prietenie/accept?notif=' + idd).then(function successCallback(response) {
            console.log("ok accept");
        });
        location.reload();
    };

    $scope.refuzaPr = function(idd) {
        $http.post('http://localhost:8080/prietenie/refuz?notif=' + idd).then(function successCallback(response) {
            console.log("ok refuz");
        });
        location.reload();
    };

    $scope.acceptaSting = function(idd) {
        $http.post('http://localhost:8080/sting/acceptat?idNotif=' + idd).then(function successCallback(response) {
            console.log("ok accept");
        });
        location.reload();
    };

    $scope.refuzaSting = function(idd) {
        $http.post('http://localhost:8080/sting/refuz?idNotif=' + idd).then(function successCallback(response) {
            console.log("ok refuz");
        });
        location.reload();
    };

    $http.get('http://localhost:8080/notif/notificari?username=' + localStorage.username).then(function (response) {
        $scope.cv = response.data;
        if ($scope.cv.toString() === "") {
            $scope.eroare = "Date invalide!";
        } else {
            $scope.cv.sort((a, b) => (a.key.id < b.key.id) ? 1 : -1);
            for(let i = 0; i < $scope.cv.length; i++) {
               var para = document.createElement('p');
               para.id = i+'a';
               para.className = "center";
               para.innerText = $scope.cv[i].value + ": " + $scope.cv[i].key.text + '\n';
               document.getElementById('Notif').appendChild(para);
               if ($scope.cv[i].key.tip === "request") {

                    let btnDa = document.createElement("button");
                    btnDa.innerHTML = "Accept";
                    btnDa.className = "butoane";
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
                    document.getElementById(i+'a').appendChild(btnDa);
                    let btnNu = document.createElement("button");
                    btnNu.className = "butoane";
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
                    document.getElementById(i+'a').appendChild(btnNu);

                }
            }

        }
    });
});


