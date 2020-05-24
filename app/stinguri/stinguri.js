'use strict';

angular.module('booksting').controller('Stinguri', function($scope, $http) {
    $scope.editMode = false;
    $scope.textbox
    $scope.adaugaTextBox = function(sting) {
        console.log(sting.value[2]);
        $scope.textbox = document.createElement('input');
        $scope.textbox.type = 'text';
        $scope.textbox.id = "pagina noua";
        document.getElementById("-"+sting.key.id).appendChild($scope.textbox);
    }
    $scope.bee = function(sting) {
        if ($scope.editMode == false) {
            $scope.adaugaTextBox(sting);
            $scope.editMode = true;
        } else {
            $http.get('http://localhost:8080/sting/updateBee?id=' + sting.key.id +
            '&username=' + localStorage.username +
            '&zile=' + document.getElementById('pagina noua').value).then(function (response) {
            })
            $scope.editMode = false;
            document.getElementById("-"+sting.key.id).removeChild($scope.textbox);
            location.reload();
        }

    };

    $scope.flower = function(sting) {
        if ($scope.editMode == false) {
            $scope.adaugaTextBox(sting);
            $scope.editMode = true;
        } else {
            $http.get('http://localhost:8080/sting/updateFlower?id=' + sting.key.id +
                '&username=' + localStorage.username +
                '&pagina=' + document.getElementById('pagina noua').value).then(function (response) {
            })
            $scope.editMode = false;
            document.getElementById("-"+sting.key.id).removeChild($scope.textbox);
            location.reload();
        }
    };
    $http.get('http://localhost:8080/sting/all?username=' + localStorage.username).then(function (response) {
        $scope.lista = response.data;
        if ($scope.lista.length == 0) return;
        $scope.lista.sort((a, b) => (a.key.id < b.key.id) ? 1 : -1);
        for (let i =0; i < $scope.lista.length; i++) {
            if ($scope.lista[i].key.status != -1) {
                var para = document.createElement('p');
                para.id = "-"+$scope.lista[i].key.id;
                var parte = 0;
                para.innerText += (($scope.lista[i].key.status == 1) ? "Sting terminat: " : "Sting activ: ");
                if ($scope.lista[i].value[0] == localStorage.username) {
                    para.innerText += "Ai provocat userul " + $scope.lista[i].value[1] + " sa citeasca ";
                    parte = 1;
                } else {
                    para.innerText += "Ai fost provocat de userul " + $scope.lista[i].value[0] + " sa citesti ";
                    parte = 2;
                }
                para.innerText += $scope.lista[i].value[2] + " pana in " + $scope.lista[i].key.stop.substr(0,10) +
                    " ora " + $scope.lista[i].key.stop.substr(12, 10) + ".";

                document.getElementById('Stinguri').appendChild(para);

                if($scope.lista[i].key.status != 1) {
                    para.innerText += " Pagina curenta este: " + $scope.lista[i].key.pagina + "\n\n";
                    let btn = document.createElement("button");
                    btn.id = $scope.lista[i].key.id;
                    if (parte == 1) {
                        btn.innerHTML = "Adauga zile";
                        btn.onclick = (function () {
                            $scope.bee($scope.lista[i]);
                        });
                    } else {
                        btn.innerHTML = "Updateaza pagina";
                        btn.onclick = (function () {
                            $scope.flower($scope.lista[i]);
                        });
                    }
                    document.getElementById('Stinguri').appendChild(btn);
                } else {
                    para.innerText += " Cartea a fost terminata la timp.";
                }
            }

        }
    });
});
