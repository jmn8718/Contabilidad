angular.module('resumenApp', [])
    .controller('ResumenBackUpController', ['$scope','$http', function($scope,$http) {
        $scope.resumenes = [];
        $scope.datos = [];

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

        $scope.calcularPorTipo = function(data){
            var resumen = {};
            for(var i=0;i<data.length;i++){
                console.log(data[i]);
                var fecha = data[i].fecha;
                var cantidad = parseFloat(data[i].cantidad);
                var concepto = data[i].concepto;
                console.log(concepto);
                if(!resumen.hasOwnProperty(concepto)){
                    console.log('Aun nada');
                    resumen[concepto]=cantidad;
                } else {
                    console.log('la tiene');
                    resumen[concepto]+=cantidad;
                };
                console.log(concepto+' : '+resumen[concepto]);
            };
            console.log(resumen);
            for(var item in resumen){
                console.log(item);
                console.log(resumen[item]);
                console.log('-------------');
                $scope.resumenes.push({concepto:item,cantidad:resumen[item]});
            };
            console.log($scope.resumenes);
        };
        //$http.get('/cuentas/getAll/backup')
        $http.get('/cuentas/getAll')
            .success(function(data){
                $scope.datos = data;
                $scope.calcular(data);
            })
            .error(function(data){
               console.log('ERROR: '+data);
            });
    }]);