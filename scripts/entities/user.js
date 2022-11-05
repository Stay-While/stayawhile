export default class User {
  constructor(username, userType) {
    this.username = username;
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
}
