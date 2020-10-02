/*const burger2 = document.querySelector(".hamburger");

burger2.addEventListener('click', () => {
    alert("testi");
    document.querySelector('.hamburger').style = "transform: scale(2);"

});*/


// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// Funktio, joka ajetaan, kun paikkatiedot on haettu
function success(pos) {
    const crd = pos.coords;

    // Tulostetaan paikkatiedot konsoliin
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
    const map = L.map('map').setView([crd.latitude, crd.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([crd.latitude, crd.longitude]).addTo(map)
        .bindPopup('Olen tässä.')
        .openPopup();
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Käynnistetään paikkatietojen haku
navigator.geolocation.getCurrentPosition(success, error, options);

const burgeri = document.querySelector('.navigation2__button');
/*const navi = document.querySelector('.navigation2__nav');
const background = document.querySelector('.navigation2__background');*/


burgeri.addEventListener('click', () => {

    /*navi.classList.toggle('background-active');
    background.classList.toggle('navi-active');*/


        document.querySelector('.navigation2__background').style.transform = "scale(120)"
        document.querySelector('.navigation2__nav').style.opacity = "1";
        document.querySelector('.navigation2__nav').style.width = "100%";

});