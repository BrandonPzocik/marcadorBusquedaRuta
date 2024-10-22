// Inicializa el mapa centrado en Formosa
var map = L.map("map").setView([-26.1849, -58.1731], 13);

// Añade una capa de tiles (mapa base)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Variables para almacenar los marcadores de origen y destino
var originMarker = null;
var destinationMarker = null;
var routingControl = null;

// Función que maneja el clic en el mapa
function onMapClick(e) {
  if (!originMarker) {
    // Si no existe el marcador de origen, lo creamos
    originMarker = L.marker(e.latlng)
      .addTo(map)
      .bindPopup("Origen")
      .openPopup();
  } else if (!destinationMarker) {
    // Si ya hay un origen, agregamos el destino
    destinationMarker = L.marker(e.latlng)
      .addTo(map)
      .bindPopup("Destino")
      .openPopup();

    // Generamos la ruta entre el origen y el destino
    routingControl = L.Routing.control({
      waypoints: [originMarker.getLatLng(), destinationMarker.getLatLng()],
      routeWhileDragging: true,
    }).addTo(map);
  }
}

// Evento para agregar los marcadores de origen y destino
map.on("click", onMapClick);

// Función para reiniciar la selección de la ruta
function resetRoute() {
  // Elimina los marcadores si existen
  if (originMarker) {
    map.removeLayer(originMarker);
    originMarker = null;
  }
  if (destinationMarker) {
    map.removeLayer(destinationMarker);
    destinationMarker = null;
  }
  // Elimina la ruta si existe
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
  }
}

// Asigna el evento del botón de reinicio
document.getElementById("resetRoute").addEventListener("click", resetRoute);
