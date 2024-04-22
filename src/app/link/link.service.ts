import {Injectable} from "@angular/core";
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getLinks() {
    return this.http.get(`${this.apiServerUrl}/link`);
  }
}
