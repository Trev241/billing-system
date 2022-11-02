import http from "../http-common";

class ProductDataService {
    create(data) {
        return http.post("/api/products/create", data)
    }
    
    get(id) {
        return http.get(`/api/products/id/${id}`)
    }

    getByName(name) {
        return http.get(`/api/products/name/${name}`)
    }
}

export default new ProductDataService();