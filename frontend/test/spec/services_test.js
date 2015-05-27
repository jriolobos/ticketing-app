'use strict';
 
describe('Modulo ticketingApp.services', function () {
 
    beforeEach(function () {
        module('ticketingApp.services');
    });
 
    describe('Tickets service', function () {
 
        var ticketsService;
        var ticketService;
 
        beforeEach(function () {
            inject(['TicketsFactory', function (service) {
                    ticketsService = service;
                }
            ]);
            inject(['TicketFactory', function (service) {
                    ticketService = service;
                }
            ]);
        });
		
    var url = 'http://192.168.1.2:8080';
	var service, $httpBackend;
	var scope;
 
	 beforeEach(inject(function(TicketsFactory, _$httpBackend_, $rootScope){
		service = TicketsFactory;
		$httpBackend = _$httpBackend_;
		scope = $rootScope.$new();
	}));


	it('Should get the status', function() {
		$httpBackend.whenGET(url + '/ticketing/web/tickets').respond(200, {"meta":{"apiVersion":"0.1","code":200,"errors":null}});
		console.log(scope.ticket);
	});

 
    it('debe devolver una lista de tickets vacia', function () {
        });
    });
});