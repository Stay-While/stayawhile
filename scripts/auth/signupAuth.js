import User from "../entities/user.js";

// on form submit verify the user
const error = document.getElementById("error-message");
const submitSignUp = document.getElementById("submit-signup");
const welcome = document.getElementById("welcome");
submitSignUp.addEventListener("click", verifyUser);

// handle welcome message
window.addEventListener("DOMContentLoaded", welcomeMessageDisappear);
window.addEventListener("DOMContentLoaded", welcomeMessageAppear);

function welcomeMessageAppear() {
  if (sessionStorage.getItem("reload") == null) {
    welcome.innerHTML = "Welcome, " + sessionStorage.getItem("username").replaceAll('"', "").fontcolor("green");
  }
  sessionStorage.setItem("reload", 1);
}

function welcomeMessageDisappear() {
  setTimeout(() => {
    welcome.remove();
  }, 3000);
}
// verify the new user
function verifyUser(event) {
  event.preventDefault();

  // create a user
  const username = document.getElementById("username-signup").value;
  const password = document.getElementById("password-signup").value;
  const userType = document.getElementById("user-type").value;
  const newUser = new User(username, password, userType);

  // add new user to database
  addUser(newUser.getUsername(), newUser.getPassword(), newUser.getUserType()).then((addedUser) => {
    if (addedUser.status == 200) {
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
}

// adds a user to the database
async function addUser(username, password, userType) {
  const response = await fetch("https://stayawhile-api.herokuapp.com/users/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password, userType: userType }),
  });
  return response;
}

// assigns a home page to the user
function assignHome(userType) {
  if (userType == "Tenant") {
    location.href = "../pages/tenant-home.html";
  } else if (userType == "Landlord") {
    location.href = "../pages/landlord-home.html";
  }
}
