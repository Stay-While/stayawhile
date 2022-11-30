import User from "../entities/user.js";

const error = document.getElementById("error-message");
const submit = document.getElementById("submit-login");
const welcome = document.getElementById("welcome");
// sessionStorage.clear();

// handle welcome message
window.addEventListener("DOMContentLoaded", welcomeMessageDisappear);
window.addEventListener("DOMContentLoaded", welcomeMessageAppear);

function welcomeMessageAppear() {
  if (sessionStorage.getItem("reload") == null) {
    welcome.innerHTML = "Welcome, " + sessionStorage.getItem("username").replaceAll('"', "").fontcolor("green");
  } else {
    welcome.remove();
  }
  sessionStorage.setItem("reload", 1);
}

function welcomeMessageDisappear() {
  setTimeout(() => {
    welcome.remove();
  }, 3000);
}

submit.addEventListener("click", verifyUser);

function verifyUser(event) {
  event.preventDefault();

  const username = document.getElementById("username-login").value;
  const password = document.getElementById("password-login").value;
  const userType = document.getElementById("user-type").value;

  const newUser = new User(username, password, userType);

  fetchUser(newUser.getUsername()).then((res) => {
    //user found
    if (res.status == 200) {
      res.json().then((data) => {
        // check if password match
        if (data != null && newUser.getPassword() == data.password && newUser.getUserType() == data.userType) {
          // add user info to session storage
          sessionStorage.clear();
          sessionStorage.setItem("username", JSON.stringify(newUser.getUsername()));
          sessionStorage.setItem("userType", JSON.stringify(newUser.getUserType()));
          assignHome(newUser.getUserType());
        } else {
          error.innerHTML = "wrong credentials";
          return;
        }
      });
    } else {
      error.innerHTML = "wrong credentials";
      return;
    }
  });
}

async function fetchUser(username) {
  const response = await fetch(`https://stayawhile-api.herokuapp.com/users/${username}`);
  return response;
}

function assignHome(userType) {
  if (userType == "Tenant") {
    location.href = "../pages/tenant-home.html";
  } else if (userType == "Landlord") {
    location.href = "../pages/landlord-home.html";
  }
}
