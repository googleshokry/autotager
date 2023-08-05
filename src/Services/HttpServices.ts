import axios from "axios";

export class HttpServices {

    private baseInstance: any;

    createInstance(baseUrl: string) {
        this.baseInstance = axios.create({baseURL: baseUrl});
        return this;
    }

    get(url: string) {
        return this.baseInstance.get(url)
    }

}