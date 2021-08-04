

function validarEmail(email) {
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test(email);
    var texto = document.getElementById('esValido');
    if (esValido == true) {
        texto.innerText = "Email válido";
    }
    else {
        texto.innerText = "Email NO válido";
    }
}

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}


function sendEmail() {
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var fecha = document.getElementById('fecha').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('mensaje').value;
    var sexo = "";

    if (document.getElementById('femenino').checked) {
        sexo = "Femenino";
    } else {
        sexo = "Masculino";
    }

   
    if (nombre.length == 0 || apellidos.length == 0 || email.length == 0 || fecha.length == 0 || mensaje.length == 0) {
        alert("Todos los campos del formulario deben completarse, verifique los datos");
    }
    else {
        Email.send({
            SecureToken: "ddfacaf3-00ff-4052-a4b8-28d51e755a21",
            To: 'dianasm4730@gmail.com',
            From: email,
            Subject: "Nuevo mensaje para CORALART",
            Body: nombre + " " + apellidos + " quiere contactarse contigo" + "<br>" +
                "------Datos------" + "<br>" +
                "Edad: " + calcularEdad(fecha) + "<br>" +
                "Sexo: " + sexo + "<br>" +
                "Correo Electrónico: " + email + "<br>" + "<br>" +
                "Mensaje: " + mensaje + "<br>" +
                "---------------------------------------------"

        }).then(function (message) {
            alert("Gracias, muy pronto estaremos en contacto")
        });
    }

}