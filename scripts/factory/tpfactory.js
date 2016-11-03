angular
  .module('app')
  	.factory('tpfactory', function ($http) {
  		var objeto = {};
  		var url = "http://www.egos27.somee.com/api/bandera";
  		objeto.nombreDelFactory = "factory de banderas";
  		objeto.traerTodo = traerTodo;
  		objeto.traerNombres = traerNombres;
  		objeto.traerBanderas = traerBanderas;
  		objeto.traerPais = traerPais;
  		return objeto;

  		function traerUrl(param){
  			if(param==null){
  				return url;
  			}
  			return url + "/" + param;
  		}

  		function traerTodo () {
	      return $http.get(traerUrl())
	      .then( function (data){

	        return data.data.Paises;

	      },function (error){
	        
	        console.error(error);
	      
	      });
	    }


	    function traerNombres() {
	      return $http.get(traerUrl())
	      .then( function (data){

	        var soloPaises = data.data.Paises.map(function(pais){
	          return {Nombre:pais.Nombre};
	        });

	        return soloPaises;
	      
	      },function (error){
	        
	        console.error(error);
	      
	      });
	    }

	    function traerBanderas() {
	      return $http.get(traerUrl())
	      .then( function (data){

	        var soloBanderas = data.data.Paises.map(function(pais){
	          return {BanderaChica:pais.BanderaChica};
	        });

	        return soloBanderas;
	      
	      },function (error){
	        
	        console.error(error);
	      
	      });
	    }

	    function traerPais(pais) {
	      return $http.get(traerUrl(pais))
	      .then( function (data){

	        return data.data;
	      
	      },function (error){
	        
	        console.error(error);
	      
	      });
	    }
  });