import { SessionStore } from "./store";

interface SessionState {
  loggedIn: boolean;
  username: string | null;
  id: string | null;
  roles: string[];
}

interface SessionAction {
  type: string;
  payload?: any;
}

// Create a reducer that handles the user session
let sessionReducer = (state: SessionState, action: SessionAction) => {
  switch (action.type) {
    case "login":
      SessionStore.loggedIn = true;
      SessionStore.username = action.payload.username;
      SessionStore.id = action.payload.id;
      SessionStore.roles = action.payload.roles;
      return {
        ...state,
        loggedIn: true,
        username: SessionStore.username,
        id: SessionStore.id,
        roles: SessionStore.roles,
      };
    case "logout":
      SessionStore.clear();
      return {
        ...state,
        loggedIn: false,
        username: SessionStore.username,
        id: SessionStore.id,
        roles: SessionStore.roles,
      };
    case "refresh":
      if (action.payload.loggedIn) {
        SessionStore.loggedIn = true;
        SessionStore.username = action.payload.username;
        SessionStore.id = action.payload.id;
        SessionStore.roles = action.payload.roles;
      } else {
        SessionStore.clear();
      }
      return {
        ...state,
        loggedIn: SessionStore.loggedIn,
        username: SessionStore.username,
        id: SessionStore.id,
        roles: SessionStore.roles,
      };
    default:
      return {
        ...state,
        loggedIn: SessionStore.loggedIn,
        username: SessionStore.username,
        id: SessionStore.id,
        roles: SessionStore.roles,
      };
  }
};

export { sessionReducer };
