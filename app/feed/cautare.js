angular.module('booksting').controller('CautareCarte', function($scope, $http) {
    $scope.cautare = function(nume) {
        $http.get('http://localhost:8080/carte/searchCarte?nume=' + nume).then(function (response) {
            $scope.carte = response.data;
            console.log($scope.carte);
            if ($scope.carte.toString() === "") {
                $scope.eroare = "Cartea nu exista!";
            } else {
                localStorage.carte = $scope.carte.nume;
                location.href="../carti/pagina_cartii.html";
            }
        });
    };
});

function cautCarte(nume) {
    let scope = angular.element(document.getElementById("CautareCarte")).scope();
    scope.$apply(function () {
        scope.cautare(nume);
    });
}

angular.module('booksting').controller('CautareUser', function($scope, $http) {
    $scope.cautare = function(nume) {
        $http.get('http://localhost:8080/user/searched?username=' + nume).then(function (response) {
            $scope.flower = response.data;
            if ($scope.flower.toString() === "") {
                $scope.eroare = "Userul nu exista!";
            } else {
                localStorage.flower = $scope.flower.username;
                location.href="../useri/pagina_user.html";
            }
        });
    };
});

function cautUser(nume) {
    let scope = angular.element(document.getElementById("CautareUser")).scope();
    scope.$apply(function () {
        scope.cautare(nume);
    });
}

