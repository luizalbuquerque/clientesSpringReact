
import axios from "axios"

export const httpclient  = axios.create({
    baseURL: "http://localhost:8080/"
})

class ApiService {
  constructor(apiurl){
      this.apiurl= apiurl;
  }
   post(url, obj){
      const requestUrl = `${this.apiurl}${url}`
       httpclient.post(requestUrl, obj);
   }

   put(url, obj){
    const requestUrl = `${this.apiurl}${url}`
    httpclient.put(requestUrl, obj);
}
 delete(url){
    const requestUrl = `${this.apiurl}${url}`
    httpclient.delete(requestUrl);
}
get(url){
    const requestUrl = `${this.apiurl}${url}`
    httpclient.get(requestUrl);
}
}

export default ApiService;