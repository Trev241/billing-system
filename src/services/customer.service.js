import http from "../http-common";

class CustomerService {
    create(data) {
        return http.post("/api/customers/create", data);
    }

    find(data) {
        return http.post("api/customers/find", data)
    }
}

export default new CustomerService();