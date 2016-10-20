angular
  .module('app')
  .controller('ConfCtrl', function($scope, data, i18nService, uiGridConstants, NgMap) {

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5o1VXghMxhnKTW417t54VD1Nhl594Be0";
    $scope.longitud = "-87";
    $scope.latitud = "41";

    $scope.haveAmigos=false;

    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });

    $scope.titulo = "Configuracion Campos";
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

    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });

    console.log(uiGridConstants);

    $scope.localizar = function(row){
      console.info(row);
      $scope.longitud = row.Longitud;
      $scope.latitud = row.Latitud;

      if(row.Amigos.length>0){
        $scope.haveAmigos = true;
        $scope.gridOptionsAmigos = {};
        $scope.gridOptionsAmigos.paginationPageSizes = [25, 50, 75];
        // Configuracion de la paginacion
        $scope.gridOptionsAmigos.paginationPageSize = 25;
        $scope.gridOptionsAmigos.columnDefs = columnDefsAmigos();
        // Activo la busqueda en todos los campos.
        $scope.gridOptionsAmigos.enableFiltering = true;
        // Configuracion del idioma.
        i18nService.setCurrentLang('es');

        $scope.gridOptionsAmigos.data = row.Amigos;
      } else {
        $scope.haveAmigos=false;
      }
      
    }

    function columnDefsAmigos(){
      return [{ field: 'edad', name: 'Edad'},
      { field: 'nombre', name: 'Nombre'},
      { field: 'raza', name: 'Raza'}];
    }

    function columnDefs () {
      return [

        { field: 'boton', displayName:'boton' ,cellTemplate:"<button ng-click='grid.appScope.localizar(row.entity)'>Accion</button>" },

        { field: 'id', name: '#', width: 45},

        { field: 'Nombre', name: 'nombre'
          ,enableFiltering: false
        },

        { field: 'apellido', name: 'apellido'},

        { field: 'email', name: 'mail'},

        { field: 'sexo', name: 'Sexo'
        // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.STARTS_WITH,
            selectOptions: [
              {value: 'Male', label: 'Masculino'},
              {value: 'Female', label: 'Femenino'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'sexo'
        },

        { field: 'ip_address', name: 'IP'
          ,filter:{
            condition: uiGridConstants.filter.STARTS_WITH,
            placeholder: 'comienza con...'
          }
        },

        { field: 'Fecha_nacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        },

        { field: 'Pais', name: 'Nacionalidad'},

        { field: 'Tarjeta_credito', name: 'Tarjeta de credito'},

        { field: 'Zona_horaria', name: 'Zona Horaria'},

        { field: 'foto', name: 'Foto', 
        cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",
        enableFiltering: false
        }
      ];
    }
  })
