import {Injectable} from "@angular/core";
import {SessionInterruptService} from "session-expiration-alert";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AppSessionInterruptService extends SessionInterruptService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }
  continueSession() {
    console.log(`I issue an API request to server.`);
  }
  stopSession() {
    console.log(`I logout.`);
  }
}
