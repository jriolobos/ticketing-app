'use strict';

/**
 Controladores de la aplicacion de incidencias.
 */

var app = angular.module('ticketingApp.controllers', []);

// limpieza del cache del navegador (en modo desarrollo)
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    });
});


app.run(['$rootScope', '$location', function($scope,$location) {

	// Enumerados utilizados en la aplicación
    $scope.levels = [
		{id: 1, name: 'bajo'},
		{id: 2, name: 'medio'},
		{id: 3, name: 'alto'},
		{id: 4, name: 'crítico'}
	];

    $scope.statuses = [
		{id: 1, name: 'abierta'},
		{id: 2, name: 'resolviéndose'},
		{id: 3, name: 'feedback'},
		{id: 4, name: 'cerrada'},
		{id: 5, name: 'resuelta'},
		{id: 6, name: 'duplicada'},
		{id: 7, name: 'no se resuelve'},
	];

    $scope.projects = [
		{id: 1, name: 'mantenimiento'},
		{id: 2, name: 'portal empleado'},
		{id: 3, name: 'sso portal'},
	];
	
	$scope.ticket = new Object();
	$scope.ticket.project = $scope.projects[0].id;	
	$scope.ticket.level = $scope.levels[0].id;	

	/**
	  Funcion de login basado en el API en la nube de parse.com
	 */
  $scope.currentUser = Parse.User.current();
 
  $scope.logIn = function(form) {
	var user = new Parse.User();
	user.set("username", form.username);
	user.set("password", form.password);
 
	var login = user.logIn(form.username,form.password, null).then(
	  function(user) {
		$scope.currentUser = user;
		$scope.loginMessage = null;
		$location.path('/ticket-list');
		$scope.$apply();
	  },
	  function(error) {
		$scope.currentUser = null;
		$scope.loginMessage = "El usuario o contraseña son incorrectos";
		$scope.$apply();
	});	
  };
 
  $scope.logOut = function(form) {
	Parse.User.logOut();
	$scope.user = null;
	$scope.currentUser = null;
  };

   /**
	Funciones de formateo
    */
   $scope.valueSelect = function(id,list) {
		for (var i = 0; i < list.length; i++) {
			var value = list[i];
			if (value.id == id) {
				return value.name;
			};
		};
	};

	$scope.resetDefaultLevel = function(){
		$scope.ticket = new Object();
		$scope.ticket.project = $scope.projects[0].id;	
		$scope.ticket.level = $scope.levels[0].id;		
	};
	
	$scope.formatDate = function(date){
	  var dateOut = new Date(date);
	  return dateOut;
    };
	
  }]);

  /**
	Directiva para declarar el editor WYSIWYG utilizado.
    */
app.directive('wysiwyg', 
function () {
  return {
    require: 'ngModel',
    link: function ($scope, el, attrs, ngModel) {
	
	  $scope.$watch("ticket", function (newValue, oldValue) {
		el.setCode($scope.ticket.description);
      });	
      el.redactor({
        keyupCallback: function(obj, e) {
            $scope.$apply(ngModel.$setViewValue(obj.getCode()));
        }
      });
//      el.setCode($scope.ticket.description);
    }
  };
});

/**
  Controlador para crear incidencia, borrar incidencia, y listar las incidencias.
 */ 
app.controller('TicketListCtrl', ['$scope', '$route', '$timeout', 'TicketsFactory', 'TicketFactory', '$location',
  function ($scope, $route, $timeout, TicketsFactory, TicketFactory, $location) {

    /* callback for ng-click 'editTicket': */
    $scope.editTicket = function (ticketId) {
      $location.path('/ticket-detail/' + ticketId);
    };

    /* callback for ng-click 'deleteTicket': */
    $scope.deleteTicket = function (ticketId) {
      TicketFactory.delete({ id: ticketId });
      $scope.tickets = TicketsFactory.query();
	  $location.path('/ticket-list');
    };

    /* callback for ng-click 'createTicket': */
    $scope.createNewTicket = function () {
      $location.path('/ticket-creation');
    };

    $scope.tickets = TicketsFactory.query();
	
}]);

/**
  Controlador para consultar el detalle y actualizar los datos de una incidencia.
 */ 
app.controller('TicketDetailCtrl', ['$scope', '$route', '$timeout', '$routeParams', 'TicketFactory', '$location',
  function ($scope, $route, $timeout, $routeParams, TicketFactory, $location) {

    /* callback for ng-click 'updateTicket': */
    $scope.updateTicket = function () {
	  $scope.ticket.updater = $scope.currentUser;
	  $scope.ticket.changedStatus = true;	
      TicketFactory.update($scope.ticket);
	  $scope.status = null;
	  $scope.ticket.changedStatus = null;
	  $scope.ticket.comment = null;
      $location.path('/ticket-detail/'+$scope.ticket.id);
	  $route.reload();
    };

    /* callback for ng-click 'cancel': */
    $scope.cancel = function () {
      $location.path('/ticket-list');
    };
	
	$scope.getTicket = function () {
		TicketFactory.show({id: $routeParams.id}, function(ticket) {
			$scope.ticket = ticket;
		});
		$scope.status = null;
	};
   
	$scope.setStatus = function(status) {
		$scope.status = status;
	};
	
	$scope.ticket = TicketFactory.show({id: $routeParams.id});
  }]);
  
  

/**
  Controlador de creación de incidencia.
*/ 
app.controller('TicketCreationCtrl', ['$scope', '$route', '$timeout', 'TicketsFactory', '$location',
  function ($scope, $route, $timeout, TicketsFactory, $location) {

    /* callback for ng-click 'createNewTicket': */
    $scope.createNewTicket = function () {
		console.log('current user: ' + $scope.currentUser.get('username'));
		$scope.ticket.creator = $scope.currentUser;
		TicketsFactory.create($scope.ticket);
		$scope.ticket = new Object();
		$scope.ticket.level = $scope.levels[0].id;	
		$location.path('/ticket-list');
    }
	
	/* callback for ng-click 'cancel': */
    $scope.cancel = function () {
      $location.path('/ticket-list');
    };
  }]);
