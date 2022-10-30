import http from "../http-common";

class TransactionService {
    create(data) {
        return http.post("/api/transactions", data);
    }

    getAll() {
        return http.get("/api/transactions/all");
    }
}

export default new TransactionService();