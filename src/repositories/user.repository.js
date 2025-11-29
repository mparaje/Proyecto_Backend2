export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers() {
    return this.dao.getUsers();
  }

  getUserById(uid) {
    return this.dao.getUserById(uid);
  }

  getUserByEmail(email){
    return this.dao.getUserByEmail(email);
  }

  createUser(user) {
    return this.dao.createUser(user);
  }

  updateUser(uid, user) {
    return this.dao.updateUser(uid, user);
  }

  setPasswordResetToken (email, token, expires){
    return this.dao.setPasswordResetToken(email, token, expires);
  }

  getUserByResetToken = async (token) => {
    return this.dao.getUserByResetToken (token);
  };

  updatePassword (uid, newPassword){
    return this.dao.updatePassword(uid, newPassword);
  }

  clearResetToken (uid){
    return this.dao.clearResetToken(uid);
  }

  
}