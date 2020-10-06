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
    const nappi = document.querySelector('.nappi');

    nappi.addEventListener('click', function() {
        var paiva = document.querySelector('#vesi').value;

        const select = document.getElementById("myDropdown");
        for(let i = 0;i < select.options.length;i++){
            if(select.options[i].value === 3 ){
                select.options[i].selected = true;
            }
        }
        if(paiva >= 0 && isFinite(paiva) && !isNaN(paiva)) {
            switch (select.value) {
                case "Talvi":
                    document.querySelector('.tulos').innerHTML = "Tarvitset n. " + paiva * 5 + " litraa vettä ja n. " + (paiva * 1.6).toFixed(2) + ' kg ruokaa ' + Math.floor(+paiva) + ":lle päivälle";
                    break;
                case "Kevät":
                    document.querySelector('.tulos').innerHTML = "Tarvitset n. " + paiva * 4 + " litraa vettä ja n. " + (paiva * 1.4).toFixed(2) + ' kg ruokaa ' + Math.floor(+paiva) + ":lle päivälle";
                    break;
                case "Kesä":
                    document.querySelector('.tulos').innerHTML = "Tarvitset n. " + paiva * 6 + " litraa vettä ja n. " + (paiva * 1.3).toFixed(2) + ' kg ruokaa ' + Math.floor(+paiva) + ":lle päivälle";
                    break;
                case "Syksy":
                    document.querySelector('.tulos').innerHTML = "Tarvitset n. " + paiva * 4 + " litraa vettä ja n. " + (paiva * 1.5).toFixed(2) + ' kg ruokaa ' + Math.floor(+paiva) + ":lle päivälle";
            }
        } else {
            document.querySelector('.tulos').innerHTML = "Ei ole positiivinen luku tai luku ollenkaan";
        }
    })
    const vesi = document.querySelector('#vesi');
    vesi.addEventListener("keyup", function(event) {
        const keyName = event.key;
        if(keyName === 'Enter') {
            document.querySelector(".nappi").click();

        }
    });
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


            let nuuksio = L.circle([60.28, 24.90], {
                color: 'red',
                fillColor: '#03',
                fillOpacity: 0.7,
                radius: 500
            }).addTo(map);

            let marker = L.marker([60.28, 24.70]).addTo(map);
            marker.bindPopup("<p> Hey you!</p>").openPopup();

            let karhunKierros = L.circle([66.269, 26.4044], {
                color: 'red',
                fillColor: '#03',
                fillOpacity: 0.7,
                radius: 1000
            }).addTo(map);

            let haltinVaellus = L.circle([69.2853282671778, 21.26888751983643], {
                color: 'red',
                fillColor: '#03',
                fillOpacity: 0.7,
                radius: 1000
            }).addTo(map);

            let kevonReitti = L.circle([69.588956, 26.732037], {
                color: 'red',
                fillColor: '#03',
                fillOpacity: 0.7,
                radius: 1000
            }).addTo(map);


            L.circle([69.509506, 28.597540], {
                color: 'red',
                fillColor: '#03',
                fillOpacity: 0.7,
                radius: 1000
            }).addTo(map);

            let pyhaLuosto = L.circle([67.019288, 27.251926], {
                color: 'blue',
                fillColor: '#03',
                fillOpacity: 0.6,
                radius: 1000
            }).addTo(map);

            map.on('click', function (e) {
                var coord = e.latlng;
                var lat = coord.lat;
                var lng = coord.lng;
                console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
            });

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




