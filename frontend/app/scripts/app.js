'use strict';

/**
	Configuracion de la aplicacion
 */
angular.module('ticketingApp', [
  'ticketingApp.services',
  'ticketingApp.controllers'
  ])
.config(function ($routeProvider, $httpProvider, $locationProvider) {

  $routeProvider.when('/ticket-list', {templateUrl: 'views/ticket-list.html', controller: 'TicketListCtrl'});
  $routeProvider.when('/ticket-detail/:id', {templateUrl: 'views/ticket-detail.html', controller: 'TicketDetailCtrl'});
  $routeProvider.when('/ticket-creation', {templateUrl: 'views/ticket-creation.html', controller: 'TicketCreationCtrl'});
  $routeProvider.otherwise({redirectTo: '/ticket-list'});
  
  /* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  
});