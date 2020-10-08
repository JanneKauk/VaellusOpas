'use strict';
//Nav
let reittibutton = document.querySelector(".btn1");
let ohjeetbutton = document.querySelector(".btn2");
let karttabutton = document.querySelector(".btn3");
reittibutton.addEventListener("click", function(){window.location.href = 'reitit.html';})
ohjeetbutton.addEventListener("click", function(){window.location.href = 'ohjeet.html';})
karttabutton.addEventListener("click", function(){window.location.href = 'kartta.html';})

//reitti sivu
if ( document.URL.includes("reitit.html") ) {
    //Haetaan article elementin sisältö talteen ja viittaus div elementtiin, div tyhjennetään uutta sisältöä varten.
    const article = document.querySelector("article"), div = document.querySelector("main div");
    document.querySelector("main div").innerHTML = "";
    let promise = results();

    async function results(){
        try{
            //Haetaan reitit ja asetetaan ne taulukkoon
            const vastaus = await fetch("json/routes.json");
            if(!vastaus.ok) throw new Error('Jokin meni pieleen.');
            const arr = await vastaus.json();
            //Jokaista kohtaa kohden luodaan article elementti, johon syötetään tallennettu article rakenne ja taulukon data
            arr.forEach(func);
        }catch(error){
            console.log(error);
        }
    }
    //Luo taulukon perusteella elementit sivulle
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

if(document.URL.includes("kartta.html")) {
    // Asetukset paikkatiedon hakua varten (valinnainen)


    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos)
    {
        const crd = pos.coords;

        // Tulostetaan paikkatiedot konsoliin
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        let jsonResult = result();
        const map = L.map('map').setView([crd.latitude, crd.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        async function result() {
            //search = q+keyword;
            //resultList.innerHTML = "";

            try {
                const vastaus = await fetch("json/routes.json");
                if (!vastaus.ok) throw new Error('Jokin meni pieleen.');
                const arr = await vastaus.json();
                arr.forEach(funct);
            } catch (error) {
                console.log(error);
            }
        }

        function funct(item) {
            L.marker([item.latitude, item.longitude], {
                draggable: true
            }).addTo(map).bindPopup(item.Route);
        }

        let marker;

        map.on('contextmenu', function () {
            if (marker !== null) {
                removeRoutingControl();
            }
        });

        map.on('click', mapClicked);

        function mapClicked(e) {
            if (marker != null) {
                removeRoutingControl();
            }
            let koordinaatit = e.latlng;
            let lat = koordinaatit.lat;
            let lng = koordinaatit.lng;
            console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
            marker = L.Routing.control({
                waypoints: [
                    L.latLng([crd.latitude, crd.longitude]),
                    L.latLng(lat, lng)
                ],
                routeWhileDragging: true
            }).addTo(map);
        }

        let removeRoutingControl = function () {
            if (marker != null) {
                map.removeControl(marker);
                marker = null;
            }
        }
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}

//testi sivu
if (document.URL.includes("ohjeet.html")){
    if (document.URL.includes("ohjeet.html")) {
        const nappi = document.querySelector('.nappi');

        nappi.addEventListener('click', function() {
            const select = document.getElementById("myDropdown");
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === 3) {
                    select.options[i].selected = true;
                }
            }
            const luku = document.getElementById("myDropdown2");
            for (let i = 0; i < select.options.length; i++) {
                if (luku.options[i].value === 14) {
                    luku.options[i].selected = true;
                }
            }
            if (luku.value >= 0 && isFinite(luku.value) && !isNaN(luku.value)) {
                switch (select.value) {
                    case "Talvi":
                        document.querySelector(
                            '.tulos').innerHTML = "Tarvitset vettä n. " + luku.value * 3 +
                            " litraa ja ruokaa n. " + (luku.value * 1.6).toFixed(2) +
                            ' kg  ';

                        break;
                    case "Kevät":
                        document.querySelector(
                            '.tulos').innerHTML = "Tarvitset vettä n. " + luku.value * 4 +
                            " litraa ja ruokaa n. " + (luku.value * 1.4).toFixed(2) +
                            ' kg ';
                        break;
                    case "Kesä":
                        document.querySelector(
                            '.tulos').innerHTML = "Tarvitset vettä n. " + luku.value * 5 +
                            " litraa ja ruokaa n. " + (luku.value * 1.3).toFixed(2) +
                            ' kg ';
                        break;
                    case "Syksy":
                        document.querySelector(
                            '.tulos').innerHTML = "Tarvitset vettä n. " + luku.value * 4 +
                            " litraa ja ruokaa n. " + (luku.value * 1.5).toFixed(2) +
                            'kg';
                        break;
                }
            } else {
                document.querySelector(
                    '.tulos').innerHTML = "Syötä reittisi kesto";
            }
        })
    }



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
        burger.classList.toggle('burger');
    });
};

navOpen();





