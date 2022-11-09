export default class User {
  constructor(username, password, userType) {
    this.username = username;
    this.password = password;
    this.userType = userType;
  }
  getUsername() {
    return this.username;
  }
  setUsername(username) {
    this.username = username;
  }
  getUserType() {
    return this.userType;
  }
  setUserType(userType) {
    this.userType = userType;
  }
  getPassword() {
    return this.password;
  }
  setPassword(password) {
    this.password = password;
  }
}
