window.onload = function () {
    const listAmenities = document.querySelector("#list_amenities").children;
    const checkedAmenities = [];
    const h4 = document.querySelector(".amenities h4");
    const containerWidth = document.querySelector(".amenities").clientWidth

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
    fetch("https://intranet.hbtn.io/projects/2135#:~:text=http%3A//0.0.0.0%3A5001/api/v1/status/")
        .then(response => response.json())
        .then(data => {

        })
        .catch(err => {
            console.log(err)
        });
}