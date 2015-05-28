'use strict';

/**
	Definición de los servicios de acceso al CRUD REST de gestión de incidencias.
 */

var services = angular.module('ticketingApp.services', ['ngResource']);

// Servicio REST de incidencias público.
// var baseUrl = 'http://actionvera.no-ip.info\\:8080';

// Servicio REST de incidencias local.
var baseUrl = 'http://localhost\\:8080';

services.factory('TicketsFactory', function ($resource) {
    return $resource(baseUrl + '/ticketing/web/tickets', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('TicketFactory', function ($resource) {
    return $resource(baseUrl + '/ticketing/web/tickets/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});
