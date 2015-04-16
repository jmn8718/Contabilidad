angular.module('cuentasApp', ['ui.bootstrap'])
    .controller('CuentasController', ['$scope','$http', function($scope,$http) {
        $scope.cuentas = [];
        $scope.filtro = "";
        $scope.today = new Date();
        $scope.registro = {
            tipo: 'Gasto',
            valor: 0
        };
        $http.get('/cuentas/getAll')
            .success(function(data){
                $scope.cuentas = data;
            })
            .error(function(data){
               console.log('ERROR: '+data);
            });
        $scope.addCuenta = function() {
            if ($scope.registro.valor > 0 && $scope.registro.cuenta.localeCompare(" ")) {
                console.log($scope.registro);
                var now = new Date();
                $scope.registro.marca = now.getTime();
                $http.post('/cuentas/add', $scope.registro)
                    .success(function (data) {
                        $scope.registro = {
                            cuenta: '',
                            valor: 0
                        };
                        $scope.cuentas = data;
                    }).error(function (data) {
                        console.log('ERROR: ' + data);
                    })
            }
        }
        $scope.deleteCuenta = function(id){
            $http.delete('/cuentas/delete/'+id)
                .success(function(data){
                    $scope.cuentas = data;
                }).error(function(data){
                    console.log('ERROR: '+data);
                })
        }

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.format = 'dd/MM/yyyy';
    }])
.controller('UsuariosController', ['$scope','$http', function($scope,$http) {
        $scope.usuario={
            usuario:null,
            password:null
        };
        $scope.logged = true;
        $scope.registerUser = function() {
            console.log($scope.usuario);
            $http.post('/usuarios/register', $scope.usuario)
                .success(function (data) {
                    $scope.usuario = {};
                }).error(function (data) {
                    console.log('ERROR: ' + data);
                })
        }
        $scope.loginUser = function() {
            console.log($scope.usuario);
            $http.post('/login', $scope.usuario)
                .success(function (data) {
                    //$scope.logged = true;                  
                }).error(function (data) {
                    console.log('ERROR: ' + data);
                })
        }
        $scope.logoutUser = function() {
            console.log($scope.usuario);
            $http.get('/logout')
                .success(function (data) {
                    $scope.usuario = {};
                    //$scope.logged = false;
                }).error(function (data) {
                    console.log('ERROR: ' + data);
                })
        }
        /*$scope.deleteUsuario = function(id){
            $http.delete('/usuarios/delete/'+id)
                .success(function(data){
                    $scope.cuentas = data;
                    console.log(data);
                }).error(function(data){
                    console.log('ERROR: '+data);
                })
        }*/
    }])
.controller('FacturasController', ['$scope','$http', function($scope,$http) {
        $scope.factura = {
            numero: 371646,
            fecha: '5/4/2015',
            cliente: {
                nombre: 'Funcave',
                direccion: {
                    calle: 'C/manuel de vega, nº 3',
                    localidad: 'Illescas 45200 (Toledo)'
                }
            },
            usuario: {
                nombre: 'Jose Miguel Navarro Madrigal',
                dni: '03790777-D',
                direccion: {
                    calle: 'Travesia del Salvador, nº 5',
                    localidad: 'Illescas 45200 (Toledo)'
                }
            }
        };
        console.log($scope.factura);
    }])
.controller('ResumenController', ['$scope','$http', function($scope,$http) {
        $scope.resumenes = [];
        $scope.datos = [];
        $scope.myYear = 0;

        $scope.calcular = function(data){
            var resumen = {};
            for(var i=0;i<data.length;i++){
                var fecha = new Date(data[i].fecha);
                var year = fecha.getFullYear();
                //console.log(year);
                var month = fecha.getMonth()+1;
                //console.log(month);
                //console.log(fecha.getDate());
                var valor = parseFloat(data[i].valor);
                if(!resumen.hasOwnProperty(year)){
                    resumen[year] = {};
                };
                if(!resumen[year].hasOwnProperty(month)){
                    resumen[year][month] = {
                        gastos: 0,
                        ingresos: 0,
                        total: 0
                    }
                };
                if(data[i].tipo == 'Ingreso'){
                    resumen[year][month].ingresos+=valor;
                    resumen[year][month].total+=valor;
                } else {
                    resumen[year][month].gastos+=valor;
                    resumen[year][month].total-=valor;
                }
                //console.log(resumen[year][month]);
            };  
            //console.log(resumen);
            var acumulado=[];
            for(var año in resumen){
                //console.log(resumen[año]);
                var values = [];
                for (var mes in resumen[año]){
                    var record = {
                        month: mes,
                        values: resumen[año][mes]
                    }
                    //console.log(resumen[año][mes]);
                    //console.log(record)
                    values.push(record);
                };
                //console.log(values);
                var record = {
                    year: año,
                    values: values
                };
                acumulado.push(record);
                //console.log(acumulado);
                //console.log('***********');
            };
            //console.log(acumulado);
            //console.log(resumen);
            $scope.resumenes = acumulado;
            console.log($scope.resumenes);
        };

        $scope.filtrar = function(){
            console.log($scope.myYear);
        };

        $http.get('/cuentas/getAll')
            .success(function(data){
                $scope.datos = data;
                $scope.calcular(data);
            })
            .error(function(data){
               console.log('ERROR: '+data);
            });
    }]);