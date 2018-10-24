import Web3 from "web3";

const EXPECTED_PASSWORD = "0x836a8af2a124e3279cf7541b82faa9c4f2d2ead41df111e4ec7ee3512ee06dcf";

const AuthUtils = {
  isLoggedIn: () => Boolean(localStorage.loggedIn),
  login: password => {
    const loggedIn = Web3.utils.sha3(password) === EXPECTED_PASSWORD;
    if (loggedIn) {
      localStorage.loggedIn = true;
    }
    return loggedIn;
  }
};

export default AuthUtils;
