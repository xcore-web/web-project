import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    private api = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    PostMessage(input: any) {
        return this.http.post(this.api + '/api/email/send', input, { responseType: 'text' }).pipe(
            map(
                (response) => {
                    if (response) {
                        return response;
                    }
                },
                (error: any) => {
                    return error;
                }
            )
        )
    }
}