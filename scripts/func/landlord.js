import Residence from "../entities/residence.js";

const owner = JSON.parse(sessionStorage.getItem("username"));
const propDash = document.getElementById("property-dashboard");
const lotAmountDisplay = document.getElementById("lot-am-ds");
const lotAvDisplay = document.getElementById("lot-av-ds");
const customCont = document.getElementById("tenants-info");

const addButton = document.getElementById("add-btn");
const addDoneButton = document.getElementById("add-done-btn");

const errorMessage = document.getElementById("error-message");
const entryFrom = document.getElementById("parking-entry-form");
addButton.addEventListener("click", () => {
  addButton.style.display = "none";
  errorMessage.style.display = "none";
  entryFrom.style.display = "block";
});

window.addEventListener("DOMContentLoaded", handleDisplay.bind(null, owner));
entryFrom.addEventListener("submit", handlePropertyForm);

function handlePropertyForm(event) {
  event.preventDefault();
  const propertyName = document.getElementById("property-name").value;
  const lotAmount = document.getElementById("lot-amount").value;
  const lotPrice = document.getElementById("lot-price").value;
  const propImg = document.getElementById("prop-img").files[0];
  // create a residence
  const newResidence = new Residence(propertyName, owner, lotPrice, lotAmount, lotAmount, propImg, []);
  // try to add to the database
  const formData = new FormData();
  formData.append("name", propertyName);
  formData.append("owner", owner);
  formData.append("price", lotPrice);
  formData.append("amount", lotAmount);
  formData.append("amountLeft", lotAmount);
  formData.append("image", propImg);
  addResidence(formData).then((result) => {
    if (result.status === 200) {
      handleDisplay(owner);
    } else if (result.status == 413) {
      errorMessage.innerHTML = "image too large";
      errorMessage.style.display = "block";
    } else {
      errorMessage.innerHTML = "please fill out the form";
      errorMessage.style.display = "block";
    }
  });
}

// check if landlord already added a parking lot
function handleDisplay(owner) {
  fetchResidence(owner).then((res) => {
    res.json().then((data) => {
      if (data == null) {
        propDash.style.display = "none";
      } else {
        addButton.style.display = "none";
        lotAmountDisplay.innerHTML = data.amount;
        lotAvDisplay.innerHTML = data.amountLeft;
        propDash.style.display = "block";
        entryFrom.style.display = "none";
        displayCustomers(data.tenants);
      }
    });
  });
}

// display residents with permit
function displayCustomers(tenants) {
  tenants.forEach((tenant) => {
    const singleCustomer = document.createElement("div");
    singleCustomer.id = "cust-info";
    const custName = document.createElement("div");
    const custPermit = document.createElement("div");
    custName.innerHTML = tenant.name;
    custPermit.innerHTML = tenant.permitExpiresOn;
    singleCustomer.appendChild(custName);
    singleCustomer.appendChild(custPermit);
    customCont.appendChild(singleCustomer);
  });
}

async function addResidence(formData) {
  const response = await fetch("https://stayawhile-api.herokuapp.com/residences/add", {
    method: "POST",
    body: formData,
  });
  return response;
}

async function fetchResidence(owner) {
  const response = await fetch(`https://stayawhile-api.herokuapp.com/residences/${owner}`);
  return response;
}
