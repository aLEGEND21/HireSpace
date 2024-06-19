const localStorageLoggedIn = "loggedIn";
const localStorageName = "username";
const localStorageID = "userID";
const localStorageRoles = "roles";

const SessionStore = {
  get loggedIn() {
    return localStorage.getItem(localStorageLoggedIn) === "true";
  },
  set loggedIn(loggedIn) {
    localStorage.setItem(localStorageLoggedIn, loggedIn ? "true" : "false");
  },
  get username() {
    return localStorage.getItem(localStorageName);
  },
  set username(name) {
    localStorage.setItem(localStorageName, name || "");
  },
  get id() {
    return localStorage.getItem(localStorageID);
  },
  set id(id) {
    localStorage.setItem(localStorageID, id || "");
  },
  get roles() {
    const r = localStorage.getItem(localStorageRoles);
    return r ? JSON.parse(r) : [];
  },
  set roles(r) {
    localStorage.setItem(localStorageRoles, JSON.stringify(r));
  },
  clear() {
    localStorage.removeItem(localStorageLoggedIn);
    localStorage.removeItem(localStorageName);
    localStorage.removeItem(localStorageID);
    localStorage.removeItem(localStorageRoles);
  },
};

export { SessionStore };
