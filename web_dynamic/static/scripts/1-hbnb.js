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
            if (outString.length > 0) {
                h4.textContent = outString;
            } else {
                h4.textContent = " ";
            }
        });
    }
}