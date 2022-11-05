const landlordCont = document.getElementById("landlord-cont");
const tenantCont = document.getElementById("tenant-cont");

window.addEventListener("DOMContentLoaded", handleProfile);

function handleProfile() {
  const userType = JSON.parse(sessionStorage.getItem("userType"));
  if (userType == "tenant") {
    tenantCont.style.display = "block";
    const time = sessionStorage.getItem("timer");
    if (time) {
      countDown(time, function () {
        $("#myModal").modal("show");
      });
    } else {
      document.getElementById("countdown").innerHTML = "No Permit Purchased.";
    }
  } else if (userType == "landlord") {
    landlordCont.style.display = "block";
  }
}

function countDown(time, callback) {
  let timer = setInterval(() => {
    document.getElementById("countdown").innerHTML = "Permit Expires in " + time + " days.";
    const owner = sessionStorage.getItem("currOwner");
    const customer = sessionStorage.getItem("user");
    // update time at customers database
    updateCustomerPermit(owner, customer, time);
    if (time-- > 0) {
      sessionStorage.setItem("timer", time);
    } else {
      window.sessionStorage.removeItem("timer");
      clearInterval(timer);
      callback();
    }
  }, 86400000);
  // 86400000
  document.getElementById("countdown").innerHTML = "Permit Expires in " + time + " days.";

  callback();
}

function updateCustomerPermit(owner, customer, day) {
  const customers = JSON.parse(localStorage.getItem("customers"));

  customers.forEach((o) => {
    if (o.owner == owner) {
      o.customers.forEach((c) => {
        if (c.name == customer) {
          c.permit = day;
          return;
        }
      });
      // o.customers.push(newCustomer);
      localStorage.setItem("customers", JSON.stringify(customers));
      return;
    }
  });
}
