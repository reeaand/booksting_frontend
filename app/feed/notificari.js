'use strict';

angular.module('booksting').controller('Notif', function($scope, $http) {
    $http.get('http://localhost:8080/notif/notificari?username=' + localStorage.username).then(function (response) {
        $scope.cv = response.data;
        if ($scope.cv.toString() === "") {
            $scope.eroare = "Date invalide!";
        } else {
            console.log("aici");
            for(var i = 0; i < $scope.cv.length; i++) {
                document.getElementById('Notif').innerHTML += '<p> ' + $scope.cv[i].value + ":<br>" + $scope.cv[i].key.text + '</p>';
            }
        }
    });
});
