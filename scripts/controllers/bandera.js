angular
  .module('app')
  .controller('BanderaCtrl', function($scope, bandera, i18nService) {

    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    bandera.traerNombres().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
      console.info(rta);
    });

    function columnDefs () {
      return [

      	{ field: 'Nombre', name: 'País'},

      	{ field: 'BanderaChica', name: 'Bandera', 
        cellTemplate:"<img ng-src='{{grid.getCellValue(row, col)}}' lazy-src>"
        }

        /*{ field: 'foto', name: 'Foto', 
        cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",
        enableFiltering: false
        }*/
      ];
    }
  })