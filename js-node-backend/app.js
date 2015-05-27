 /*
	Backend básico para crear servicios RESTful con javascript.
	Está basado en nodejs + express
  */

var ticketRepository = new TicketRepository();
ticketRepository.createTickets();

var express = require('express');

var app = express();
app.use(express.bodyParser());

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');

  next();
}

app.use(allowCrossDomain);

var MY_PORT = 8080; // default: 4730

/* REST API =========================================== */
var baseUrl = '/ticketing/web';

/* GET ALL -------------------------------------------- */
app.get(baseUrl + '/tickets', function(req, res) {
	res.json(ticketRepository.getAll());
});

/* GET By Id ------------------------------------------ */
app.get(baseUrl + '/tickets/:id', function(req, res) {
  console.log('trying to retrieve ticket with id: ' + req.params.id);
  var ticket = ticketRepository.getById(req.params.id);
  res.json(ticket);
});

/* POST Create ---------------------------------------- */
app.post(baseUrl + '/tickets', function(req, res) {
  if(!req.body.hasOwnProperty('summary')) {
    res.statusCode = 400;
    return res.send('Error 400: POST syntax incorrect.');
  }

  var newTicket = ticketRepository.addNewTicket(req.body);
   console.log('create ticket with id: ' + newTicket.id);

  res.json(newTicket);
});

/* PUT (Update) --------------------------------------- */
app.put(baseUrl + '/tickets/:id', function (req, res) {
  if(!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('summary') ) {
    res.statusCode = 400;
    return res.send('Error 400: PUT syntax incorrect.');
  }
  var changedTicket = ticketRepository.changeTicket(req.params.id, req.body);
  res.json(changedTicket);
});

/* DELETE --------------------------------------------- */
app.delete(baseUrl + '/tickets/:id', function(req, res) {
  console.log('trying to delete ticket with id: ' + req.params.id);
  ticketRepository.deleteTicket(req.params.id);
  res.json(true);
});


app.listen(process.env.PORT || MY_PORT);


/**
 Entidades de modelo
*/
function Ticket(id, summary, description, project) {
	this(id, summary, description, project, new Date(), 'bajo', 'abierta', null, []);
};


function Ticket(id, summary, description, project, date, level, status, creator, log) {
	this.id = id;
	this.summary = summary;
	this.description = description;
	this.project = project;
	this.date = date;
	this.level = level;
	this.status = status;
	this.creator = creator;
	this.log = log;
};

function Log(id, comment, ticket, user) {
	this.id = id;
	this.comment = comment;
	this.status = ticket.status;
	this.user = user;
	this.date = new Date();
};

/**
	Repositorio de incidencias
 */
function TicketRepository() {

	this.tickets = [];

	this.createTickets = function() {
/*		var numberOfTickets = 3;
		for (var i = 0; i < numberOfTickets; i++) {
			var id = i + 1;
			this.tickets.push(new Ticket(id, 'Summary ' + id, 'Extended text ' + id, new Date(), 1, 1, null, []));
		};
*/
		return this.tickets;
	};

	this.getMaxTicketId = function() {
		if(this.tickets.length == 0)
			return 0;
		return Math.max.apply(Math, this.tickets.map(function(ticket) { 
			return ticket.id; 
		}));
	};
	
	this.getNumberOfTickets = function() {
		return this.tickets.length;
	};

	this.getAll = function() {
		return this.tickets;
	};

	this.getById = function(id) {
		var foundTicket = false;
		for (var i = 0; i < this.tickets.length; i++) {
			var ticket = this.tickets[i];
			if (ticket.id == id) {
				foundTicket = true;
				return ticket;
			};
		};
		if (!foundTicket) {
			return 'ticket with id ' + id + ' not found.';
		};
	};

	this.addNewTicket = function(ticket) {
	    console.log('max ticket id: '+this.getMaxTicketId());
		var newTicket = new Ticket(this.getMaxTicketId() + 1, ticket.summary, ticket.description, ticket.project);
		newTicket.date = new Date();
		newTicket.creator = ticket.creator;
		newTicket.level = ticket.level;
		// por defecto se crean siempre en estado 'abierta'
		newTicket.status = 1;
		// por defecto indicamos un comentario de sistema al abrir
		var log = new Log(1,'Incidencia abierta', newTicket, newTicket.creator);
		newTicket.log = [];
		newTicket.log.push(log);

		this.tickets.push(newTicket);
		return this.getById(newTicket.id);
	};

	this.changeTicket = function(id, changedTicket) {
		var ticket = this.getById(id);
		ticket.summary = changedTicket.summary;
		ticket.description = changedTicket.description;
		ticket.project = changedTicket.project;
		ticket.level = changedTicket.level;		
		ticket.status = changedTicket.status;	
		if(changedTicket.comment)
		{
			var log = new Log(1, changedTicket.comment, changedTicket, changedTicket.updater);
			ticket.log.push(log);
		}
		return ticket;
	};

	this.deleteTicket = function(id) {
    // sorry, i'm tired and don't know javascript that well...
    var indexToDelete = -1;
    for (var i = 0; i < this.tickets.length; i++) {
      var tickets = this.tickets[i];
      if (tickets.id == id) {
        indexToDelete = i;
        break;
      };
    };

    if (indexToDelete >= 0) {
      this.tickets.splice(indexToDelete, 1);
    };
	};
};


/**
	Tests en consola
 */
console.log('PrintLine Testing... :-(');

// crear tickets prueba
var testTicketRepository = new TicketRepository();
var tickets = testTicketRepository.createTickets();
console.log('testCreateTickets: number of initial tickets: ' + tickets.length);

// crear nuevo ticket
var ticket = new Ticket(1,'Resumen','Descripcion','Proyecto');
var newTicket = testTicketRepository.addNewTicket(ticket);
console.log('testAddNewTicket: new ticket: id=' + newTicket.id + ' summary:' + newTicket.summary + ' descripcion:' + newTicket.description);
console.log('testAddNewTicket: number of ticket (after adding a ticket): ' + testTicketRepository.getNumberOfTickets());

// modificar ticket
ticket.summary = 'Modificado';
var changedTicket = testTicketRepository.changeTicket(1, ticket);
console.log('testChangeTicket: changed ticket: id=' + changedTicket.id + ' summary:' + changedTicket.summary + ' description:' + changedTicket.description);
var u = testTicketRepository.getById(1);
console.log('testChangeTicket: ticket: id=' + u.id + ' summary:' + u.summary + ' description:' + u.description);
console.log('testChangeTicket: number of tickets (after changing a ticket): ' + testTicketRepository.getNumberOfTickets());

// borrar ticket
testTicketRepository.deleteTicket(1);
console.log('testDeleteTicket: number of tickets (after deleting a ticket): ' + ticketRepository.getNumberOfTickets());

// listar tickets
var allTickets = ticketRepository.getAll();
console.log('testGetAll: size of array: ' + allTickets.length);
