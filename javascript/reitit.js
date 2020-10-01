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
    newElement.querySelector("h3 b").innerHTML = `Sijainti: ${item.Location}<br>Vaikeusaste: ${item.Difficulty}`;
    newElement.querySelector("p").innerText = item.Description;
}