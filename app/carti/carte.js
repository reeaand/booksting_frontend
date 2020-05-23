'use strict';

angular.module('booksting').controller('Carte', function($scope, $http) {
    $http.get('http://localhost:8080/carte/searchCarte?nume=' + localStorage.carte).then(function (response) {
        $scope.carte = response.data;
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


