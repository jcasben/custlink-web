import {Injectable, signal} from "@angular/core";
import {User} from "../user/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<User | undefined | null>(undefined);
}
