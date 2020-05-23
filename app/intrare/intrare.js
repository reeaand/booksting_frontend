angular.module('booksting').controller('Intrare', function($scope, $http) {
    $scope.login = function(username, parola) {
        $http.get('http://localhost:8080/user/logIn?username=' + username + '&parola=' + parola).then(function (response) {
            $scope.datele = response.data;
            if ($scope.datele.toString() === "") {
                $scope.eroare = "Datele de logare sunt invalide!";
            } else {
                location.href ="../feed/feed.html";
                localStorage.username = $scope.datele.username;
            }
        });
    };

    $scope.register = function(username, parola,descriere) {
        $http.get('http://localhost:8080/user/signUp?username=' + username + '&parola=' + parola +
            '&descriere=' + descriere).then(function (response) {
            $scope.datele = response.data;
            if ($scope.datele.toString() === "") {
                $scope.eroare = "Datele de inregistrare sunt invalide!";
            } else {
                location.href="../feed/feed.html";
                localStorage.username = $scope.datele.username;
            }
        });
    };
});

function logare(username,  parola) {
    var scope = angular.element(document.getElementById("Intrare")).scope();
    scope.$apply(function () {
        scope.login(username, parola);
    });
}

function inregistrare(username,  parola, descriere) {
    var scope = angular.element(document.getElementById("Intrare")).scope();
    scope.$apply(function () {
        scope.register(username, parola, descriere);
    });
}
