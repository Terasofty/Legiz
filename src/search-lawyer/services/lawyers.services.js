import http from '@/core/http-common'

class LawyersServices {
    endPoint = '/lawyers';

    getAll() {
        return http.get(this.endPoint);
    }

    getBySpecializationAndAddress(specialization,address) {
        return http.get(`${this.endPoint}?specialization=${specialization}&address=${address}`);
    }
}

export default new LawyersServices();