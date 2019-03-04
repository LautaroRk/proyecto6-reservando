let expect = chai.expect;

describe('Tests Restaurant', function(){
    
    beforeEach(function(){
        restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
    });

    context('.reservarHorario(horario)', function(){

        it('Si se reserva un horario existente, el horario es eliminado del arreglo', function(){
            restaurant.reservarHorario('15:30');
            expect(restaurant.horarios).to.not.include('15:30');
        });
    
        it('Si se reserva un horario inexistente, el arreglo se mantiene igual', function(){
            let horariosAnterior = restaurant.horarios;
            restaurant.reservarHorario('20:00');
            expect(restaurant.horarios).to.eql(horariosAnterior);
        });
    
        it('Si no recibe ningun parametro, el arreglo se mantiene igual', function(){
            let horariosAnterior = restaurant.horarios;
            restaurant.reservarHorario();
            expect(restaurant.horarios).to.eql(horariosAnterior);
        });
    });

    context('.obtenerPuntuacion()', function(){

        it('El promedio se calcula correctamente', function(){
            expect(restaurant.obtenerPuntuacion()).to.equal(7.4);
        });

        it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0', function(){
            restaurant.calificaciones = [];
            expect(restaurant.obtenerPuntuacion()).to.equal(0);
        });
    });

    context('.calificar(nuevaCalificacion)', function(){

        it('Si la calificacion es 10, se agrega correctamente al arreglo', function(){
            restaurant.calificar(10);
            expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5, 10]);
        });

        it('Si la calificacion es 1, se agrega correctamente al arreglo', function(){
            restaurant.calificar(1);
            expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5, 1]);
        });

        it('Si la calificacion es 0, el arreglo se mantiene igual', function(){
            restaurant.calificar(0);
            expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        });

        it('Si la calificacion es negativa, el arreglo se mantiene igual', function(){
            restaurant.calificar(-5);
            expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        });

        it('Si la calificacion es mayor a 10, el arreglo se mantiene igual', function(){
            restaurant.calificar(15);
            expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        });
    });
});

describe('Tests Listado', function(){

    beforeEach(function(){
        listado = new Listado([
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7])
        ]);
    });

    context('.buscarRestaurante(id)', function(){

        it('Encuentra y devuelve correctamente el primer restaurante del listado', function(){
            let restaurant = listado.buscarRestaurante(1);
            expect(restaurant.nombre).to.equal("TAO Uptown");
        });

        it('Encuentra y devuelve correctamente el ultimo restaurante del listado', function(){
            let restaurant = listado.buscarRestaurante(4);
            expect(restaurant.nombre).to.equal("Bleecker Street Pizza");
        });

        it('Si el id NO está en el listado, devuelve el mensaje correspondiente', function(){
            let restaurant = listado.buscarRestaurante(0);
            expect(restaurant).to.equal("No se ha encontrado ningún restaurant");
        });

        it('Si el id NO está en el listado, el listado se mantiene intacto', function(){
            let listadoAnterior = listado;
            listado.buscarRestaurante(5);
            expect(listado).to.eql(listadoAnterior);
        });
    });

    context('.obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)', function(){

        beforeEach(function(){
            listadoAnterior = listado;
        });

        it('Si no se aplica ningun filtro, el listado queda igual', function(){
            let listadoFiltrado = listado.obtenerRestaurantes(null, null, null);
            expect(listadoFiltrado).to.equal(listadoAnterior.restaurantes);
        });

        it('El filtro por rubro funciona correctamente', function(){
            let listadoFiltrado = listado.obtenerRestaurantes('Asiática', null, null);
            let funciona = listadoFiltrado.every(restaurante => restaurante.rubro === 'Asiática');
            expect(funciona).to.be.true;
        });

        it('El filtro por ciudad funciona correctamente', function(){
            let listadoFiltrado = listado.obtenerRestaurantes(null, 'Nueva York', null);
            let funciona = listadoFiltrado.every(restaurante => restaurante.ubicacion === 'Nueva York');
            expect(funciona).to.be.true;
        });

        it('El filtro por horario funciona correctamente', function(){
            let listadoFiltrado = listado.obtenerRestaurantes(null, null, '12:00');
            let funciona = listadoFiltrado.every(restaurante => restaurante.horarios.includes('12:00'));
            expect(funciona).to.be.true;
        });

        it('Los tres filtros juntos funcionan correctamente', function(){
            let listadoFiltrado = listado.obtenerRestaurantes('Asiática', 'Nueva York', '13:00');
            let funciona = listadoFiltrado.every(restaurante => restaurante.rubro === 'Asiática' && restaurante.ubicacion === 'Nueva York' && restaurante.horarios.includes('13:00'));
            expect(funciona).to.be.true;
        });
    });
});

describe('Tests Reserva', function(){
    
    beforeEach(function(){
        reserva = new Reserva (new Date(2018, 7, 28, 16, 00), 1, 500); //Martes 16:00hs
        reserva1 = new Reserva (new Date(2018, 7, 27, 14, 00), 2, 150, "DES200"); //Lunes 14:00hs
        reserva2 = new Reserva (new Date(2018, 7, 23, 11, 00), 3, 300, "DES1"); //Viernes 11:00hs
        reserva3 = new Reserva (new Date(2019, 2, 3, 13, 30), 1, 100); //Domingo 13:30hs
        reserva4 = new Reserva (new Date(2019, 2, 3, 13, 30), 7, 100, "DES15"); //Domingo 13:30hs
    });

    context('.obtenerPrecioBase()', function(){

        it('Calcula correctamente el precio base.', function(){
            expect(reserva1.obtenerPrecioBase()).to.equal(300);
        });
    });

    context('.obtenerPrecioFinal()', function(){

        it('Si no hay ningun descuento ni recargo, el precio final es igual al base.', function(){
            expect(reserva.obtenerPrecioFinal()).to.equal(500);
        });

        it('Aplica el descuento DES200 correctamente.', function(){
            expect(reserva1.obtenerPrecioFinal()).to.equal(100);
        });

        it('Aplica el descuento DES1 correctamente.', function(){
            expect(reserva2.obtenerPrecioFinal()).to.equal(600);
        });

        it('Aplica correctamente todos los recargos.', function(){
            expect(reserva3.obtenerPrecioFinal()).to.equal(115);
        })

        it('Aplica correctamente todos los descuentos y recargos.', function(){
            expect(reserva4.obtenerPrecioFinal()).to.equal(630);
        })
    });

    // context('.aplicarDescuento(precioBase, codigoDeDescuento)', function(){

    //     it('Aplica correctamente el descuento DES200', function(){
    //         let precioBase = reserva1.obtenerPrecioBase();
    //         expect(aplicarDescuento(precioBase, 'DES200').to.equal(100));
    //     });

    // });
});