const owner = JSON.parse(sessionStorage.getItem("user"));
const propDash = document.getElementById("property-dashboard");
const lotAmountDisplay = document.getElementById("lot-am-ds");
const lotAvDisplay = document.getElementById("lot-av-ds");
const customCont = document.getElementById("tenants-info");

const propertyName = document.getElementById("property-name");
const lotAmount = document.getElementById("lot-amount");
const lotPrice = document.getElementById("lot-price");
const propImg = document.getElementById("prop-img");
const addButton = document.getElementById("add-btn");
const addDoneButton = document.getElementById("add-done-btn");

const errorMessage = document.getElementById("error-message");

addButton.addEventListener("click", () => {
  addButton.style.display = "none";
  errorMessage.style.display = "none";
  document.getElementById("parking-entry-form").style.display = "block";
});

addDoneButton.addEventListener("click", handlePropertyForm);
window.addEventListener("DOMContentLoaded", handleDisplay);

function handlePropertyForm(event) {
  event.preventDefault();
  // check empty form
  if (propertyName.value == "" || lotAmount.value == "0") {
    errorMessage.style.display = "block";
    return;
  }
  // addButton.style.display = "block";
  document.getElementById("parking-entry-form").style.display = "none";
  const reader = new FileReader();
  // let imgURL;
  reader.onload = function (e) {
    if (addPropertyToDatabase(reader.result)) {
      console.log(JSON.parse(localStorage.getItem("residence")));
      handleDisplay();
    }
  };
  reader.readAsDataURL(propImg.files[0]);
}

function addPropertyToDatabase(imgURL) {
  const newResidence = {
    image: imgURL,
    name: propertyName.value,
    owner: owner,
    price: lotPrice.value,
    amountLeft: lotAmount.value,
    amount: lotAmount.value,
  };

  const residence = JSON.parse(localStorage.getItem("residence"));
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (residence == null) {
    const newResidenceArr = [newResidence];
    localStorage.setItem("residence", JSON.stringify(newResidenceArr));
    return true;
  } else {
    let resExist = false;
    residence.forEach((res) => {
      if (res.owner == user) {
        resExist = true;
      }
    });
    if (!resExist) {
      residence.push(newResidence);
      localStorage.setItem("residence", JSON.stringify(residence));
      return true;
    }
  }
  return false;
}

function handleDisplay() {
  const residence = JSON.parse(localStorage.getItem("residence"));
  const user = JSON.parse(sessionStorage.getItem("user"));
  let resExist = false;
  if (residence == null) {
    propDash.style.display = "none";
    return;
  }
  residence.forEach((res) => {
    if (res.owner == user) {
      addButton.style.display = "none";
      lotAmountDisplay.innerHTML = res.amount;
      lotAvDisplay.innerHTML = res.amountLeft;
      propDash.style.display = "block";
      displayCustomers(user);
      resExist = true;
      return;
    }
  });
  if (!resExist) {
    propDash.style.display = "none";
  }
}
function displayCustomers(owner) {
  const customers = JSON.parse(localStorage.getItem("customers"));
  if (customers == null) {
    return;
  } else {
    customers.forEach((o) => {
      if (o.owner == owner) {
        o.customers.forEach((c) => {
          const singleCustomer = document.createElement("div");
          singleCustomer.id = "cust-info";
          const custName = document.createElement("div");
          const custPermit = document.createElement("div");
          custName.innerHTML = c.name.replaceAll('"', "");
          custPermit.innerHTML = c.permit;
          singleCustomer.appendChild(custName);
          singleCustomer.appendChild(custPermit);
          customCont.appendChild(singleCustomer);
          //name c.name
          // permit c.permit
        });
      }
    });
  }
}
