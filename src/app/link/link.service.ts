import {inject, Injectable} from "@angular/core";
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Link} from "./Link";

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private apiServerUrl = environment.apiBaseUrl;
  http = inject(HttpClient);

  public getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(`${this.apiServerUrl}/link/links`);
  }

  public createLink(link: Link): Observable<Link> {
    return this.http.post<Link>(`${this.apiServerUrl}/link/createLink`, link);
  }

  public updateLink(name: string, link: Link): Observable<Link> {
    return this.http.put<Link>(`${this.apiServerUrl}/link/update/${name}`, link);
  }

  public deleteLink(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/link/delete/${name}`);
  }
}
