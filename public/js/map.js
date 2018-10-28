// Langkah 1
function findLocation(x,y, places) {
    for (let i = 0; i < places.length; i++) {
        if (places[i].lokasi[0] == x && places[i].lokasi[1] == y) {
            return i;
        }
    }
    return -1;
}

function showLocation(places,e) {
    let ix = findLocation(e.latlng.lat, e.latlng.lng, places);
    if(ix >= 0 ) {
        img.src = places[ix].gambar;
        par.textContent = places[ix].review;
    }
}

/**
  * Langkah 5b
  * Penyerderhanaan menggunakan IIFE, jadi function langsung dijalankan tanpa harus dipanggil
  */

    // (async function () {
    //     try {
    //        const URL = "data/peta.json"
    //        const response = await fetch(URL)
    //        const responseJson = await response.json()
    //        resolve(responseJson)
           
    //     } catch(err) {
    //         console.log(err)
    //     }
    // })();

let gmb = document.getElementById('gmb')
let rev = document.getElementById('review')
let img = document.createElement('img')
let par = document.createElement('p')

gmb.appendChild(img)
rev.appendChild(par)

// let r0="Tasty food; good drinks and a very nice service.";
// let r1="Tempat nongkrong dengan outdoor seating ditaman dan live musik sambil menikmati kopi yg berkualitas.";
// let r2="Coffees, teas, and regular selection of western and local foods";
// let r3="Brilliant place lovely staff well priced food and drink.";
// let r4="Amazing food, good service and good atmosphere to sit.";
// let places= [
//     {"lokasi": [-8.5068079, 115.2629917], "sponsor" : "Seniman Coffee Studio","gambar":"images/seniman.jpeg","review": r0},
//     {"lokasi": [-8.683502, 115.1553763], "sponsor" : "Titik Temu","gambar":"images/titiktemu.jpeg","review": r1},
//     {"lokasi": [-8.7045497, 115.2477722], "sponsor" : "Kopi Bali House", "gambar":"images/kopibali.jpg","review": r2},
//     {"lokasi": [-8.7016157, 115.1776513], "sponsor" : "Kopi Luwak Roast House and Cafe","gambar":"images/kopiluwak.jpg","review": r3},
//     {"lokasi": [-8.7150239, 115.1711875], "sponsor" : "Kopi Pot", "gambar":"images/kopipot.jpg","review": r4}
// ];

// Langkah 3
// Menggunakan fetch
const URL = "data/peta.json"
var places
fetch(URL)
    .then((response) => {
        if(response.status !== 200) {
            console.log("Ada masalah dengan status code : " + response.status)
            return;
        }
        return response.json()
    })
    .then(resp => { 
        let places = resp.places
        localStorage.setItem('places', JSON.stringify(resp.places));
        places = JSON.parse(localStorage.getItem('places'));
        console.log(places)
        for (let p of places) {
            var marker= L.marker(p.lokasi).addTo(mymap).bindPopup(p.sponsor);
            marker.on('click', function(e) {
                showLocation(places, e)
            });
        }
    })
    .catch(err => console.log(err))

/**
 * Langkah 5a
 * Menggunakan FETCH dengan Async and Await
 * 
 * 
 */

//  async function f(url) {
//      try {
//         const response = await fetch(url)
//         const responseJson = await response.json()
//         localStorage.setItem('places', JSON.stringify(responseJson.places));
//      } catch(err) {
//          console.log(err)
//      }
//  }

//  f(URL);


