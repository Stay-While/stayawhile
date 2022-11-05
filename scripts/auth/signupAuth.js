import crypt from "./crypt.js";
import User from "../entities/user.js";

const username = document.getElementById("username-signup");
const password = document.getElementById("password-signup");
const userType = document.getElementById("user-type");
const error = document.getElementById("error-message");
const submit = document.getElementById("submit-signup");
submit.addEventListener("click", verifyUser);

// sessionStorage.clear();
const user = new User();

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
  const encryptedPassword = crypt.encrypt(password.value);
  const newUser = { username: username.value, password: encryptedPassword, userType: userType.value };
  const users = JSON.parse(localStorage.getItem("users"));
  user.setUsername(username.value);
  user.setUserType(userType.value);
  if (users == null) {
    const newUserArr = [{ username: username.value, password: encryptedPassword, userType: userType.value }];
    localStorage.setItem("users", JSON.stringify(newUserArr));
    sessionStorage.setItem("user", JSON.stringify(user.getUsername()));
    sessionStorage.setItem("userType", JSON.stringify(user.getUserType()));

    assignHome(userType.value);
    return;
  } else {
    let userExist = false;
    users.forEach((user) => {
      if (user.username == username.value && user.userType == userType.value) {
        userExist = true;
        error.innerHTML = "wrong credentials";
        return;
      }
    });
    if (!userExist) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      // store user info to session storage
      sessionStorage.setItem("user", JSON.stringify(user.username));
      sessionStorage.setItem("userType", JSON.stringify(user.userType));

      assignHome(newUser.userType);
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
