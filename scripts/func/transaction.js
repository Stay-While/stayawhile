const amount = document.getElementById("amount");
const payBtn = document.getElementById("pay-btn");

const err = document.createElement("p");
err.id = "err";
amount.innerHTML = "$" + sessionStorage.getItem("cost");
payBtn.addEventListener("click", handlePayment);

// review purchase
const info = document.getElementById("parking-purchase-info");
const lotName = document.createElement("div");
lotName.id = "lot-name";
lotName.innerHTML = "Residence: " + sessionStorage.getItem("name").fontcolor("purple");
const lotOwner = document.createElement("div");
lotOwner.id = "lot-owner";
lotOwner.innerHTML = "Owner: " + sessionStorage.getItem("currOwner").fontcolor("purple");
const lotCost = document.createElement("div");
lotCost.id = "lot-cost";
lotCost.innerHTML = "Cost: " + ("$" + sessionStorage.getItem("cost")).fontcolor("purple");
info.appendChild(lotName);
info.appendChild(lotOwner);
info.appendChild(lotCost);
function handlePayment() {
  const owner = sessionStorage.getItem("currOwner");
  const plateNum = document.getElementById("license-no").value;
  const carColor = document.getElementById("color").value;
  const carModel = document.getElementById("model").value;
  const carVin = document.getElementById("vin").value;
  fetchResidence(owner).then((res) => {
    if (res.status === 200) {
      res.json().then((data) => {
        let amountLeft = data.amountLeft;
        if (amountLeft > 0) {
          amountLeft--;
          updateResidence(owner, amountLeft);
        } else {
          err.innerHTML = "Parking lot unavailable";
          err.style.color = "rgb(255, 132, 132)";
          amount.appendChild(err);
        }
      });
    }
  });
  let customer = sessionStorage.getItem("username");
  customer = customer.replaceAll('"', "");
  addCustomer(owner, customer, plateNum, carColor, carModel, carVin, 365).then((res) => {
    if (res.status == 200) {
      location.href = "../pages/profile.html";
    } else {
      err.innerHTML = "Error has occurred.";
      err.style.color = "rgb(255, 132, 132)";
      amount.appendChild(err);
    }
  });
}

async function addCustomer(owner, customer, plateNum, carColor, carModel, carVin, permitExpiresOn) {
  const response = await fetch(`https://stayawhile-api.herokuapp.com/residences/addTenant/${owner}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: customer,
      licensePlate: plateNum,
      carColor: carColor,
      carModel: carModel,
      carVin: carVin,
      permitExpiresOn: permitExpiresOn,
    }),
  });
  return response;
}

async function fetchResidence(owner) {
  const response = await fetch(`https://stayawhile-api.herokuapp.com/residences/${owner}`);
  return response;
}

async function updateResidence(owner, amountLeft) {
  const response = await fetch(`https://stayawhile-api.herokuapp.com/residences/update/${owner}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amountLeft: amountLeft,
    }),
  });
  return response;
}
