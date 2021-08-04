var contador = 0;

function prompter() {
    
    var primeravez ; 

    if (contador == 0) {
        localStorage.setItem('esPirmeravez', contador);
        var primeravez = localStorage.getItem('esPirmeravez');
    }
    else{
        var primeravez = localStorage.getItem('esPirmeravez');
    }
    
    console.log(primeravez);

    if (primeravez == 0) {
        var reply = prompt("Buenas ¿cuál es tu nombre?", "")

        if (reply == null)
            alert("Es un gusto tenerte aquí!")

        else
            alert("Es un gusto tenerte aquí " + reply + "!")
    }


    contador++;
    localStorage.setItem('esPirmeravez', contador);
}
