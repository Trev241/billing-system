import http from "../http-common";

class TransactionService {
    create(data) {
        return http.post("/transactions", data);
    }
}

export default new TransactionService();