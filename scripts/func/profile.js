const landlordCont = document.getElementById("landlord-cont");
const tenantCont = document.getElementById("tenant-cont");

window.addEventListener("DOMContentLoaded", handleProfile);

async function handleProfile() {
  const userType = JSON.parse(sessionStorage.getItem("userType"));
  if (userType == "Tenant") {
    tenantCont.style.display = "block";
    const username = JSON.parse(sessionStorage.getItem("username"));
    // check if permit exist
    document.getElementById("countdown").innerHTML = "No Permit Purchased.";
    await fetchResidences().then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.forEach((res) => {
            res.tenants.forEach((tenant) => {
              if (tenant.name == username) {
                // tenant has purchased
                countDown(tenant.permitExpiresOn, function () {
                  $("#myModal").modal("show");
                });
                return;
              }
            });
          });
        });
      }
    });
  } else if (userType == "Landlord") {
    landlordCont.style.display = "block";
  }
}

async function countDown(time, callback) {
  let timer = setInterval(async () => {
    document.getElementById("countdown").innerHTML = "Permit Expires in " + time + " days.";
    const owner = sessionStorage.getItem("currOwner");
    let customer = sessionStorage.getItem("username");
    customer = customer.replaceAll('"', "");
    // update time at customers database
    await updatePermitDate(owner, customer, time).then((res) => {
      // console.log(owner, customer, time);
      console.log(res);
    });
    if (time-- <= 0) {
      clearInterval(timer);
      callback();
    }
  }, 86400000);
  // 86400000
  document.getElementById("countdown").innerHTML = "Permit Expires in " + time + " days.";

  callback();
}

async function updatePermitDate(owner, customer, permitDate) {
  const response = await fetch(
    `https://stayawhile-api.herokuapp.com/residences/update/${owner}/${customer}/${permitDate}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

async function permitExist(username) {
  let v;
  let res = await fetchResidences().then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        data.forEach((res) => {
          res.tenants.forEach((tenant) => {
            if (tenant.name == username) {
              return tenant;
            }
          });
        });
      });
    }
  });
  return;
}

async function fetchResidences() {
  const response = await fetch("https://stayawhile-api.herokuapp.com/residences/all");
  return response;
}
