import http from "../http-common";

class ProductDataService {
    get(id) {
        return http.get(`/api/products/id/${id}`)
    }

    getByName(name) {
        return http.get(`/api/products/name/${name}`)
    }
}

export default new ProductDataService();