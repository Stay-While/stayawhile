import crypt from "./crypt.js";

const username = document.getElementById("username-login");
const password = document.getElementById("password-login");
const userType = document.getElementById("user-type");
const error = document.getElementById("error-message");
const submit = document.getElementById("submit-login");

// sessionStorage.clear();

submit.addEventListener("click", verifyUser);

function verifyUser(event) {
  event.preventDefault();
  if (username.value == "") {
    error.innerHTML = "empty username";
    return;
  }
  if (password.value == "") {
    error.innerHTML = "empty password";
    return;
  }
  const users = JSON.parse(localStorage.getItem("users"));

  if (users == null) {
    error.innerHTML = "wrong credentials";
    return;
  } else {
    let userExist = false;
    users.forEach((user) => {
      const decryptedPassword = crypt.decrypt(user.password);
      if (user.username == username.value && decryptedPassword == password.value && user.userType == userType.value) {
        userExist = true;
        assignHome(userType.value);
        sessionStorage.setItem("user", JSON.stringify(user.username));
        sessionStorage.setItem("userType", JSON.stringify(user.userType));
        return;
      }
    });
    if (!userExist) {
      error.innerHTML = "wrong credentials";
    }
  }
}

function assignHome(userType) {
  if (userType == "tenant") {
    location.href = "../pages/tenant-home.html";
  } else if (userType == "landlord") {
    location.href = "../pages/landlord-home.html";
  }
}
