var Cuentas = 
[{
    "id": 1,
    "nombre": "Mali",
    "saldo": 200,
    "contrasena": 123
},
{
    "id": 2,
    "nombre": "Gera",
    "saldo": 290,
    "contrasena": 123
},
{
    "id": 3,
    "nombre": "Maui",
    "saldo": 67,
    "contrasena": 123
}
]

if( localStorage.getItem("data") === null ) {
    localStorage.setItem("data", JSON.stringify(Cuentas));
};