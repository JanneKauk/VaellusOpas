'use strict';
//reitti sivu
if ( document.URL.includes("reitit.html") ) {
    const article = document.querySelector("article"), div = document.querySelector("main div");
    document.querySelector("main div").innerHTML = "";

    let r = results();

    async function results(){
        //search = q+keyword;
        //resultList.innerHTML = "";

        try{
            const vastaus = await fetch("json/routes.json");
            if(!vastaus.ok) throw new Error('Jokin meni pieleen.');
            const arr = await vastaus.json();
            arr.forEach(func);
        }catch(error){
            console.log(error);
        }
    }

    function func(item, index){
        let newElement = document.createElement("article");
        newElement.innerHTML = article.innerHTML;
        newElement.className = "reitti-box";
        div.appendChild(newElement);
        newElement.querySelector("h2").innerText = item.Route;
        newElement.querySelector("img").src = item.img;
        newElement.querySelector("h3 b").innerHTML = `Lähtöpiste: ${item.Location}<br>Pituus: ${item.Difficulty}`;
        newElement.querySelector("p").innerText = item.Description;
    }
}

//testi sivu
if (document.URL.includes("ohjeet.html")){
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

}

//burger scripti
const navOpen = () => {
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.buttons');
    const navLinks = document.querySelectorAll('.buttons li');

    burger.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('nav-active');

        //Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `buttonsFade 0.5s ease forwards ${index / 5 +
                0.3}s`;
            }
        });
        //Burger animation
        burger.classList.toggle('toggle');
    });
};

navOpen();