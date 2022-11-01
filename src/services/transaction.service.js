import http from "../http-common";

class TransactionService {
    create(data) {
        return http.post("/api/transactions/create", data)
    }

    getDetails(data) {
        return http.post("/api/transactions/details", data)
    }

    getAll() {
        return http.get("/api/transactions/all")
    }
}

export default new TransactionService();