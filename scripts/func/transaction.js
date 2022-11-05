const amount = document.getElementById("amount");
const payBtn = document.getElementById("pay-btn");

const err = document.createElement("p");
err.id = "err";
amount.innerHTML = sessionStorage.getItem("cost");
payBtn.addEventListener("click", handlePayment);

function handlePayment() {
  sessionStorage.setItem("timer", 365);
  // decrease lot amount
  const owner = sessionStorage.getItem("currOwner");
  const customer = sessionStorage.getItem("user");
  const residence = JSON.parse(localStorage.getItem("residence"));
  residence.forEach((res) => {
    if (res.owner == owner) {
      if (res.amountLeft > 0) {
        res.amountLeft--;
        localStorage.setItem("residence", JSON.stringify(residence));

        location.href = "../pages/profile.html";
        return;
      } else {
        err.innerHTML = "Parking lot unavailable";
        err.style.color = "rgb(255, 132, 132)";
        amount.appendChild(err);
      }
    }
  });
  addCustomer(owner, customer, 365);
}

function addCustomer(owner, customer, day) {
  const customers = JSON.parse(localStorage.getItem("customers"));
  const newCustomers = [
    {
      owner: owner,
      customers: [{ name: customer, permit: day }],
    },
  ];

  if (customers == null) {
    localStorage.setItem("customers", JSON.stringify(newCustomers));
  } else {
    let ownerExist = false;
    customers.forEach((o) => {
      if (o.owner == owner) {
        const newCustomer = {
          name: customer,
          permit: day,
        };
        o.customers.push(newCustomer);
        localStorage.setItem("customers", JSON.stringify(customers));
        ownerExist = true;
      }
    });
    if (!ownerExist) {
      customers.push(newCustomers[0]);
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  }
}
// display to landlord
// clear session storage
