let Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones, precioPorPersona) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.reservas = [];
    this.imagen = imagen;
    this.calificaciones = calificaciones;
    this.precioPorPersona = precioPorPersona;
}

Restaurant.prototype.reservarHorario = function(props) {
    if(!props) return;
    this.horarios = this.horarios.filter(horario => horario !== props.horario);
    
    let fecha = new Date();
    fecha.setHours(props.horario.split(':')[0]);
    fecha.setMinutes(props.horario.split(':')[1]);
    fecha.setSeconds(0);

    this.reservas.push(new Reserva(this, fecha, props.cantidad, this.precioPorPersona, props.cupon));
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return Math.round(promedio(this.calificaciones) * 10) / 10;
    }
}

