var divMapa = document.getElementById('map');
navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);

function fn_mal(error) {
    var msj;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            msj = "no se ha permitido el acceso a la posición del usuario.";
            break;
        case error.POSITION_UNAVAILABLE:
            msj = "No se ha podido acceder a la información de su posición.";
            break;
        case error.TIMEOUT:
            msj = "El servicio ha tardado demasiado tiempo en responder.";
            break;
        default:
            msj = "Error desconocido.";
    }
    alert('No se pudo obtener ubicación debido a que ' + msj)
}

function fn_ok(respuesta) {
    var lat = respuesta.coords.latitude;
    var lon = respuesta.coords.longitude;

    var gLatLonUsuario = new google.maps.LatLng(lat, lon);
    var gLatLonFijo = new google.maps.LatLng(10.089758769793244, -84.34820871504361);
    var objConfig = {
        zoom: 10,
        center: gLatLonFijo
    }
    var gMapa = new google.maps.Map(divMapa, objConfig);
    var objConfigMarkerFijo = {
        position: gLatLonFijo,
        map: gMapa,
        title: "Coralart",

    }
    var objConfigMarkerUsuario = {
        position: gLatLonUsuario,
        map: gMapa,
        title: "Ubicación actual",
        height: '2px',
        width: '2px'
    }

    var gMarkerFijo = new google.maps.Marker(objConfigMarkerFijo);
    var gMarkerUsuario = new google.maps.Marker(objConfigMarkerUsuario);

    var objConfigDR = {
        map: gMapa
    }

    var objConfigDS = {
        origin: gLatLonFijo,
        destination: gLatLonUsuario,
        travelMode: google.maps.TravelMode.DRIVING
    }

    var ds = new google.maps.DirectionsService();

    var dr = new google.maps.DirectionsRenderer(
        objConfigDR
    );

    ds.route(objConfigDS, fnRutear);

    function fnRutear(resultados, status) {
        if (status == 'OK') {
            dr.setDirections(resultados);
        } else {
            alert('Error' + status);
        }
    }

    document.getElementById("distancia").innerText = (google.maps.geometry.spherical.computeDistanceBetween(
        gLatLonFijo,
        gMarkerUsuario.getPosition()) / 1000).toFixed(2) + " km.";

}

function rad(x) {
    return x * Math.PI / 180;
};

function getDistance(p1, p2) {

    var R = 6378137;
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};