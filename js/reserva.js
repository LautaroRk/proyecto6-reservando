let Reserva = function(restaurant, fecha, cantidad, precioPorPersona, cupon) {
    this.restaurant = restaurant;
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.precioPorPersona = precioPorPersona;
    this.cupon = cupon;
}

Reserva.prototype.obtenerPrecioBase = function() {
    return this.precioPorPersona * this.cantidad;
}

Reserva.prototype.obtenerPrecioFinal = function() {
    let precioBase = this.obtenerPrecioBase();
    let adicional = this.calcularAdicionales(precioBase);
    let descuento = this.calcularDescuentos(precioBase);

    return precioBase + adicional - descuento;
}

Reserva.prototype.calcularAdicionales = function(precioBase) {
    let adicionalTotal = 0;

    let dia = this.fecha.getDay();
    let hora = this.fecha.getHours();

    //Adicional por fin de semana
    if(dia >= 5 || dia === 0) {
        adicionalTotal += calcularPorcentaje(10, precioBase);
    }
    //Adicional por hora pico
    if(hora === 13 || hora === 20){
        adicionalTotal += calcularPorcentaje(5, precioBase);
    }

    return adicionalTotal;
}

Reserva.prototype.cuponesValidos = ['DES15','DES200','DES1'];

Reserva.prototype.calcularDescuentos = function(precioBase) {
    let descuentoTotal = 0;

    //Descuentos para grupos
    //4 a 6 personas
    if(this.cantidad >= 4 && this.cantidad <= 6) {
        descuentoTotal += calcularPorcentaje(5, precioBase);
    }
    //7 a 8 personas
    if(this.cantidad >= 7 && this.cantidad <= 8) {
        descuentoTotal += calcularPorcentaje(10, precioBase);
    }
    //Más de 8 personas
    if(this.cantidad > 8) {
        descuentoTotal += calcularPorcentaje(15, precioBase);
    }
    
    //Descuentos por cupon
    switch (this.cupon) {

        case 'DES15': 
            descuentoTotal += calcularPorcentaje(15, precioBase);
            break;

        case 'DES200':
            descuentoTotal += 200;
            break;

        case 'DES1':
            descuentoTotal += this.precioPorPersona;
            break;

        default:
            break;
    }

    return descuentoTotal;
}