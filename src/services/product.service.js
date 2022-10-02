import http from "../http-common";

class ProductDataService {
    get(id) {
        return http.get(`/products/${id}`);
    }
}

export default new ProductDataService();