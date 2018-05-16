// declarar un array que representara los asientos de nuesto avion con false indicando que estos esten vacios
//ocupado = true

var airlineSeats = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
];

//contador que nos ayudara a rastrear el numero de asientos ocupados
var busySeats = 0;

var paintSeats = function (array) {
    var containerSeats = document.getElementById('seats');

    for (var i = 0; i < array.length; i++) {
        var seat = document.createElement('div');
        seat.className = 'seats';

        //del primer elemento al cuarto, en nuestro arreglo va a ser Primera Clase, que seria del indice 0 al indice 3
        if (i < 4) {
            seat.style.background = '#1AC097';
        } else {
            seat.style.background = '#0051FF';
        }
        containerSeats.appendChild(seat);
    }
};

var reserve = function () {
    var btn = document.getElementById('btn');
    btn.addEventListener('click', chooseZone);
};

var chooseZone = function () {
    var choice = prompt('En que zona prefieres reservar \n 1. Primera Clase \n 2. Economica \n \n Por favor ingresa el numero tu preferencia');
    if (choice == 1) {
        checkFirstClassZone();
    } else if (choice == 2) {
        checkEconomicZone();
    } else {
        alert('Por favor ingresa un numero valido');
    }
};

var checkFirstClassZone = function () {
    var zone = 'Primera Clase';
    // recorre del elemento 0al elemento 3 y verifica cuales estan disponibles
    for (var index = 0; index < 4; index++) {
        if (airlineSeats[index] == false) {
            airlineSeats[index] = true;
            reserveSeat(index);
            paintTicket(index, zone);
            busySeats++;
            //al reservar un asiento no necesitamos seguir recorriendo nuestro arreglo
            //rompemos el for con break
            break;
        } else if (index == 3 && airlineSeats[index] == true) {
            reasignEconomicZone(zone);
        }
    }
};

var checkEconomicZone = function () {
    var zone = 'Economica';
    for (var index = 4; index < 10; index++) {
        if (airlineSeats[index] == false) {
            airlineSeats[index] = true;
            reserveSeat(index);
            paintTicket(index, zone);
            busySeats++;
            break;
        } else if (index == 9 && airlineSeats[index] == true) {
            reasigFirstClassZone(zone);
        }
    }
};

var reserveSeat = function (indexToPaint) {
    var seat = document.getElementsByClassName('seats');
    seat[indexToPaint].textContent = 'Ocupado';
};

var reasignEconomicZone = function (zone) {
    if (busySeats == 10) {
        noSeats();
        nextFlight();
    } else {
        var reasign = confirm('Ya no quedan asientos disponibles en ' + zone + ':( \n Quieres reservar en zona Economica? ');
        if (reasign == true) {
            checkEconomicZone();
        } else {
            nextFlight();
        }
    }
};

var reasigFirstClassZone = function (zone) {
    if (busySeats == 10) {
        noSeats();
        nextFlight();
    } else {
        var reasign = confirm('Ya no quedan asientos en ' + zone + ':( \n Quieres reservar en Primera Clase? ');
        if (reasign == true) {
            checkFirstClassZone();
        } else {
            nextFlight();
        }
    }
};

var paintTicket = function (index, zone) {
    var containerTickets = document.getElementById('tickets');
    var tickets = document.createElement('div');
    tickets.className = 'seats';
    var title = document.createElement('p');
    var reservedSeating = document.createElement('p');
    var zoneClass = document.createElement('p');
    title.textContent = 'PASE DE ABORDAR';
    reservedSeating.textContent = 'No. de asiento: ' + (index + 1);
    zoneClass.textContent = zone;
    tickets.appendChild(title);
    tickets.appendChild(reservedSeating);
    tickets.appendChild(zoneClass);
    containerTickets.appendChild(tickets);
};

var nextFlight = function () {
    alert('Nuestro proximo vuelo sale en 3 horas!');
};

var noSeats = function(){
    alert('Lo sentimos :( \n Ya no quedan asientos disponibles en este avion. ');
};

paintSeats(airlineSeats);
reserve();
