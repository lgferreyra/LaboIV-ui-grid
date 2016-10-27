angular
  .module('app')
  .service('bandera', function ($http) {
/*    function extraerData (data){
      return data.data;
    }*/

    this.traerTodo = function () {
      return $http.get('http://www.egos27.somee.com/api/bandera')
      .then( function (data){

        return data.data.Paises;

      },function (error){
        
        console.error(error);
      
      });
    }

    this.traerNombres = function () {
      return $http.get('http://www.egos27.somee.com/api/bandera')
      .then( function (data){

        var soloPaises = data.data.Paises.map(function(pais){
          return {Nombre:pais.Nombre};
        });

        console.info(soloPaises);
        return soloPaises;
      
      },function (error){
        
        console.error(error);
      
      });
    }

    this.traerBanderas = function () {
      return $http.get('http://www.egos27.somee.com/api/bandera')
      .then( function (data){

        var soloBanderas = data.data.Paises.map(function(pais){
          return {BanderaChica:pais.BanderaChica};
        });

        console.info(soloBanderas);
        return soloBanderas;
      
      },function (error){
        
        console.error(error);
      
      });
    }

    this.traerPais = function(pais) {
      return $http.get('http://www.egos27.somee.com/api/bandera/' + pais)
      .then( function (data){

        console.info(bandera.data);
        return bandera.data;
      
      },function (error){
        
        console.error(error);
      
      });
    }

  })