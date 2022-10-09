import http from "../http-common";

const REGISTER_URL = "/register"
const LOGIN_URL = "/login"
const CONFIRM_URL = "/exists"

class UserService {
    // register(email, password) {
    //     try {
    //         http.post(
    //             REGISTER_URL,
    //             JSON.stringify(email, password),
    //         )
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    exists(data) {
        return http.post(CONFIRM_URL, data)
    }

    login(credentials) {
        return http.post(LOGIN_URL, credentials)
    }

    register(credentials) {
        return http.post(REGISTER_URL, credentials)
    }

    // create(data) {
    //     return http.post(
    //         REGISTER_URL, 
    //         data
    //     );
    // }
}

export default new UserService();