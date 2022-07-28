let data = JSON.parse(localStorage.getItem("data"));
let boton = document.getElementById("enviar");
let saldoFinal = document.getElementById("saldo");
let logged = document.getElementById("usuario");
let usuarioSesion = JSON.parse(localStorage.getItem("sesion"));



window.addEventListener('DOMContentLoaded', (event) => {
    
    //login("Gera", 123)
    
    if (sesionActiva()) {

        logged.textContent = `Usuario ${usuarioSesion.nombre}`;
        saldoFinal.textContent = `$ ${usuarioSesion.saldo}.00`;
    }

});

boton.addEventListener("click", (e) => {

    if (sesionActiva()) {

        let accion = Array.from(document.getElementsByName("accion")).find(a => a.checked).value;
        let inputCantidad = document.getElementById("cantidad").value;
        let idUsuario = JSON.parse(localStorage.getItem("sesion")).id;



        switch (Number(accion)) {
            case 1:
                retirarDinero(idUsuario, Number(inputCantidad));
                break;

            case 2:
                agregarDinero(idUsuario, Number(inputCantidad));
                break;

            default:
                break;
        }
    } else {
        alert("Debe iniciar sesion para manejar la cuenta");
    }
});


function login(nombre, pass) {

    let usuarioLogged;

    for (const usuario of data) {
        if (usuario.nombre === nombre && usuario.contrasena === pass) {
            //obtener las etiquetas del html y setear nombre y valores de la cuenta

            localStorage.setItem("sesion", JSON.stringify(usuario));
            usuarioLogged = usuario;
            break;
        }
    }
}

function logout() {
    localStorage.setItem("sesion", "");
    //cambiar las etiquetas en el html a default por haber cerrado sesion
}

function sesionActiva() {
    return localStorage.getItem("sesion") != null;
}

function consultarSaldo(idCliente) {

    let saldo;

    data.map((cuenta) => {
        if (cuenta.id === idCliente) {
            saldo = cuenta.saldo;
        }
    });

    return saldo;
};

function agregarDinero(idCliente, cantidad) {

    let nuevoSaldo;
    let sueldoActualAux;

    for (const cuenta of data) {
        if (cuenta.id === idCliente) {

            sueldoActualAux = cuenta.saldo + cantidad;

            if (!Number(sueldoActualAux)) {
                alert("Favor de ingresar una cantidad valida.")
                return;
            };

            if (validarMonto(sueldoActualAux)) {
                //obtener el elemento del html y setearle el mensaje en pantalla

                nuevoSaldo = cuenta.saldo;

                alert("se excede el monto maximo de la cuenta.")

                break;
            } else {

                cuenta.saldo = sueldoActualAux;

                nuevoSaldo = cuenta.saldo;

                usuarioSesion.saldo = nuevoSaldo;

                saldoFinal.textContent = `$ ${nuevoSaldo}.00`;

                break;
            }
        }
    }

    actualizarData(data);

    return nuevoSaldo;
}

function retirarDinero(idCliente, cantidad) {

    let nuevoSaldo;
    let sueldoActualAux;

    for (const cuenta of data) {
        if (cuenta.id === idCliente) {

            sueldoActualAux = cuenta.saldo - cantidad;

            if (!Number(sueldoActualAux)) {
                alert("Favor de ingresar una cantidad valida.")
                return;
            };

            if (validarMonto(sueldoActualAux)) {
                //obtener el elemento del html y setearle el mensaje en pantalla

                nuevoSaldo = cuenta.saldo;

                alert("se excede el monto minimo de la cuenta.")

                break;
            } else {

                cuenta.saldo = sueldoActualAux;

                nuevoSaldo = cuenta.saldo;

                usuarioSesion.saldo = nuevoSaldo;

                saldoFinal.textContent = `$ ${nuevoSaldo}.00`;

                break;
            }
        }
    }

    actualizarData(data);

    return nuevoSaldo;
}

function esCliente(idCliente) {

    let esCliente = false;

    data.map((cuenta) => {
        if (cuenta.id === idCliente) {
            esCliente = true;
        }
    });

    return esCliente;
}

function actualizarData(data) {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("sesion", JSON.stringify(usuarioSesion));
}

function validarMonto(monto) {

    if (monto > 990 || monto < 10) {
        return true;
    }
    return false;
}



//console.log(agregarDinero(1, 20));
//console.log(retirarDinero(1, 10));
//console.log(consultarSaldo(1));
//console.log(login("Mali", 123));
//console.log(logout())
//console.log(sesionActiva());
//console.log(data);