let data = JSON.parse(localStorage.getItem("data"));
let boton = document.getElementById("enviar");
let saldoFinal = document.getElementById("saldo");
let logged = document.getElementById("usuario");
let usuarioSesion = JSON.parse(localStorage.getItem("sesion"));


window.addEventListener('DOMContentLoaded', (event) => {

    //logout();
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

        if (Number(inputCantidad) < 0) {
            alert("No se pueden agregar cantidades negativas.")
            return;
        }

        if (!Number(inputCantidad)) {
            alert("Favor de ingresar una cantidad valida.")
            return;
        };

        switch (Number(accion)) {
            //retirar dinero
            case 1:
                retirarDinero(idUsuario, Number(inputCantidad));
                document.getElementById("cantidad").value = "";
                break;

                //agregar dinero
            case 2:
                agregarDinero(idUsuario, Number(inputCantidad));
                document.getElementById("cantidad").value = "";
                break;

            default:
                break;
        }
    } else {
        alert("Debe iniciar sesion para manejar la cuenta.");
    }
});


function login(nombre, pass) {

    let usuarioLogged;

    for (const usuario of data) {
        if (usuario.nombre === nombre && usuario.contrasena === pass) {

            localStorage.setItem("sesion", JSON.stringify(usuario));
            usuarioLogged = usuario;
            break;
        }
    }

    if (usuarioLogged === undefined) {
        alert("Usuario no encontrado.")
        return;
    }

}

function logout() {
    localStorage.removeItem("sesion");
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

            if (validarMonto(sueldoActualAux)) {

                nuevoSaldo = cuenta.saldo;

                alert("Se excede el monto maximo de la cuenta de $990.")

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

            if (validarMonto(sueldoActualAux)) {

                nuevoSaldo = cuenta.saldo;

                alert("No puede tener en su cuenta menos de $10.")

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