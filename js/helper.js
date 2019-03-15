function sumatoria(array) {
    return array.reduce((a,b) => a+b);
}

function promedio(array) {
    return sumatoria(array) / array.length;
}

function eliminarRepetidos(array) {
    return array.filter((elem, index, self) => index === self.indexOf(elem));
}

function calcularPorcentaje(porcentaje, numero) {
    return (numero * porcentaje) / 100;
}

function horarioDosDigitos(fecha) {
    let horas = fecha.getHours() > 9 ? fecha.getHours() : '0' + fecha.getHours();
    let minutos = fecha.getMinutes() > 9 ? fecha.getMinutes() : '0' + fecha.getMinutes();

    return '' + horas + ':' + minutos;
}