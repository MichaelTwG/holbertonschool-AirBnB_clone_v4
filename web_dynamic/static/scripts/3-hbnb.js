async function getPlaces(filters) {
  // esta funcion se encarga de obtener los places coincidentes con los filtros aplicados y retornarlos en un JSON
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filters)
  };
  
  try {
    const response = await fetch("http://10.9.100.6:5001/api/v1/places_search/", options);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function showPlaces(filters) {
  // esta funcion se encarga de imprimir en la pagina web los places y obtener los filtros actuales

  //obtener una respuesta de la API
  const places = await getPlaces(filters);

  // temporalmente mostrar los datos obtenidos por la consola
  console.log(places);

  const placeResult = document.querySelector("#placesResult");
  placeResult.innerHTML = "";
  // cargar los places en el html
  for (p of places) {
    const article = document.createElement("article");

    const titleBox = document.createElement("div");
    const information = document.createElement("div");
    const user = document.createElement("div");
    const desc = document.createElement("div");

    titleBox.innerHTML = `<h2>${p.name}</h2>
    <div class="price_by_night">${p.price_by_night}</div>`;

    information.innerHTML = `<div class="max_guest">${p.max_guest} Guest's</div>
    <div class="number_rooms">${p.number_rooms} Bedroom's</div>
    <div class="number_bathrooms">${p.number_bathrooms} Bathroom's</div>`;

    user.innerHTML = `<b>Owner:</b> ${p.user_id}`;

    desc.innerHTML = p.description;

    titleBox.classList.add("title_box");
    information.classList.add("information");
    user.classList.add("user");
    desc.classList.add("description");
    article.appendChild(titleBox);
    article.appendChild(information);
    article.appendChild(user);
    article.appendChild(desc);

    placeResult.appendChild(article);
  }
}

window.onload = async function () {
    const listAmenities = document.querySelector("#list_amenities").children;
    const checkedAmenities = [];
    const h4 = document.querySelector(".amenities h4");

    for (amenity of listAmenities) {
        const input = amenity.firstElementChild;

        input.addEventListener("change", () => {
            if (input.checked) {
                checkedAmenities.push(input.getAttribute("data-name"));
            } else {
                index = checkedAmenities.indexOf(input.getAttribute("data-name"));
                checkedAmenities.splice(index, 1);
            }
            let outString = "";
            let count = 0;
            for (amenityTrue of checkedAmenities) {
                
                outString += amenityTrue;
                
                if (count < checkedAmenities.length - 1) {
                    outString += ", ";
                }
                count += 1;
            }
            if (outString.length >= 32) {
                outString = outString.substring(0, 32) + "..."
            }
            h4.textContent = outString;
        });
    }

    const status = document.querySelector("#api_status");

    try {

      const response = await fetch("http://10.9.100.6:5001/api/v1/status/");
      const data = await response.json();

      if (data.status === "OK") {

        status.classList.add("available");


        const button = document.querySelector("#searchButton");

        button.addEventListener("click", async () => {
          // se obtienen los filtros a travez de un evento
          const filters = {};
          const amenityTrue = [];

          for (amenity of listAmenities) {
            const input = amenity.firstElementChild;
            if (input.checked) {
              amenityTrue.push(input.getAttribute("data-id"));
            };

            filters["amenities"] = amenityTrue;
          };

          //se hace la request a la API con sus filtros y se muestra en el html y por consola
          await showPlaces(filters);
        });

      } else {
        status.classList.remove("available");
      }

    } catch (err) {
      console.log(err);
      status.classList.remove("available");
    }
};