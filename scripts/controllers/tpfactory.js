angular
  .module('app')
  .controller('TpfactoryCtrl', function($scope, i18nService, otrofactory) {

    console.info(otrofactory);
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    $scope.gridOptions.rowHeight=66;
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    otrofactory.traerPais("Argentina").then(function(rta){
      // Cargo los datos en la grilla.
        console.info(rta);
      $scope.gridOptions.data = rta;
    
    });

    function columnDefs () {
      return [

        { field: 'Nombre', name: 'País'},

        { field: 'BanderaChica', name: 'Bandera', 
        cellTemplate:"<img width='90px' height='60px' ng-src='{{grid.getCellValue(row, col)}}'>",
        enableFiltering: false
        }

        /*{ field: 'foto', name: 'Foto', 
        cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",
        enableFiltering: false
        }*/
      ];
    }

  })