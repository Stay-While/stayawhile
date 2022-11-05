const propertyList = document.getElementById("property-list");
const profile = document.getElementById("profile");
let purchaseBtn;
let unavailable;
let cost;
let owner;
window.addEventListener("DOMContentLoaded", displayProperty);
profile.addEventListener("click", navigateProfile);
function displayProperty() {
  const residence = JSON.parse(localStorage.getItem("residence"));
  residence.forEach((res) => {
    let residenceContainer = document.createElement("li");
    residenceContainer.id = "res-container";
    let residenceDescriptionContainer = document.createElement("div");
    residenceDescriptionContainer.id = "res-des-cont";
    let propCaption = document.createElement("div");
    propCaption.id = "prop-cap";
    let size = Object.keys(res).length;
    // add image
    const img = document.createElement("img");
    img.id = "ten-img";
    img.setAttribute("src", Object.values(res)[0]);
    residenceDescriptionContainer.appendChild(img);
    for (let i = 1; i < size - 1; i++) {
      let residenceDescription = document.createElement("p");
      residenceDescription.id = Object.keys(res)[i];
      if (Object.keys(res)[i] == "amountLeft") {
        residenceDescription.innerHTML = Object.values(res)[i] + " Available";
      } else if (Object.keys(res)[i] == "price") {
        residenceDescription.innerHTML = "$" + Object.values(res)[i] + " /year";
      } else {
        residenceDescription.innerHTML = Object.values(res)[i];
      }

      propCaption.appendChild(residenceDescription);
    }
    residenceDescriptionContainer.appendChild(propCaption);
    // check if parking full
    if (res.amountLeft > 0) {
      // if (unavailable) {
      //   residenceDescriptionContainer.removeChild(unavailable);
      // }
      purchaseBtn = document.createElement("input");
      purchaseBtn.id = "purchase-btn";
      purchaseBtn.type = "submit";
      purchaseBtn.value = "Purchase";

      purchaseBtn.addEventListener("click", handlePurchase);
      residenceDescriptionContainer.appendChild(purchaseBtn);
    } else {
      // if (purchaseBtn) residenceDescriptionContainer.removeChild(purchaseBtn);
      unavailable = document.createElement("p");
      unavailable.innerHTML = "Unavailable";
      unavailable.style.color = "red";
      unavailable.id = "unavailable";
      residenceDescriptionContainer.appendChild(unavailable);
    }
    residenceContainer.appendChild(residenceDescriptionContainer);
    propertyList.appendChild(residenceContainer);
  });
}

function handlePurchase(event) {
  cost = event.originalTarget.parentNode.childNodes[1].childNodes[2].innerHTML;
  owner = event.originalTarget.parentNode.childNodes[1].childNodes[1].innerHTML;
  sessionStorage.setItem("cost", cost);
  sessionStorage.setItem("currOwner", owner);
  location.href = "../../pages/transaction.html";
}

function navigateProfile() {
  location.href = "../../pages/profile.html";
}
