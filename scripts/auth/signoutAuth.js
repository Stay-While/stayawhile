const signOut = document.getElementById("signout");
const signOutP = document.getElementById("signoutp");

signOut.addEventListener("click", signOutUser);
signOutP.addEventListener("click", signOutUser);

function signOutUser(event) {
  event.preventDefault();
  sessionStorage.setItem("username", null);
  sessionStorage.setItem("userType", null);
  location.href = "../index.html";
}
