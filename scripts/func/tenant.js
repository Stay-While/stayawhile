const propertyList = document.getElementById("property-list");
const profile = document.getElementById("profile");
let purchaseBtn;
let unavailable;
let cost;
let owner;
window.addEventListener("DOMContentLoaded", displayProperty);
profile.addEventListener("click", navigateProfile);
function displayProperty() {
  // get all residences
  fetchResidences().then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        // display all the residences
        data.forEach((residence) => {
          // residence containers
          let residenceContainer = document.createElement("li");
          residenceContainer.id = "res-container";
          let residenceDescriptionContainer = document.createElement("div");
          residenceDescriptionContainer.id = "res-des-cont";
          let propCaption = document.createElement("div");
          propCaption.id = "prop-cap";

          // residence image
          const img = document.createElement("img");
          img.id = "ten-img";
          if (!(typeof residence.image === "undefined")) {
            img.setAttribute("src", "https://stayawhile-api.herokuapp.com/" + residence.image);
          }

          // info about residence

          let residenceName = document.createElement("p");
          residenceName.id = "name";
          residenceName.innerHTML = residence.name;

          let residenceOwner = document.createElement("p");
          residenceOwner.id = "owner";
          residenceOwner.innerHTML = residence.owner;

          let residencePrice = document.createElement("p");
          residencePrice.id = "price";
          residencePrice.innerHTML = "$" + residence.price + " /year";

          let residenceAmountLeft = document.createElement("p");
          residenceAmountLeft.id = "amountLeft";
          if (residence.amountLeft > 0) residenceAmountLeft.innerHTML = residence.amountLeft + " Available";

          residenceDescriptionContainer.appendChild(img);
          residenceDescriptionContainer.appendChild(residenceName);
          residenceDescriptionContainer.appendChild(residenceOwner);
          residenceDescriptionContainer.appendChild(residencePrice);
          residenceDescriptionContainer.appendChild(residenceAmountLeft);

          residenceContainer.append(residenceDescriptionContainer);

          // check purchase availability
          if (residence.amountLeft > 0) {
            purchaseBtn = document.createElement("input");
            purchaseBtn.id = "purchase-btn";
            purchaseBtn.type = "submit";
            purchaseBtn.value = "Purchase";
            purchaseBtn.addEventListener("click", handlePurchase.bind(null, residence.price, residence.owner));
            residenceDescriptionContainer.appendChild(purchaseBtn);
          } else {
            unavailable = document.createElement("p");
            unavailable.innerHTML = "Unavailable";
            unavailable.style.color = "red";
            unavailable.id = "unavailable";
            residenceDescriptionContainer.appendChild(unavailable);
          }

          propertyList.appendChild(residenceContainer);
        });
      });
    }
  });
}

function handlePurchase(cost, owner) {
  sessionStorage.setItem("cost", cost);
  sessionStorage.setItem("currOwner", owner);
  location.href = "../../pages/transaction.html";
}

function navigateProfile() {
  location.href = "../../pages/profile.html";
}

async function fetchResidences() {
  const response = await fetch("https://stayawhile-api.herokuapp.com/residences/all");
  return response;
}
