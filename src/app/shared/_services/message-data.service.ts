import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MessageItemCreate } from "../_models/message-item-create.model";
import { MessageItem } from "../_models/message-item.model";


@Injectable({
    providedIn: 'root'
})
export class MessageDataService {
    baseUrl = environment.apiUrl;
    private actionUrl: string;

    constructor(private http: HttpClient) {
        this.actionUrl = this.baseUrl + '/api/message-items';
    }

    getAllMessages(): Observable<MessageItem[]> {
        return this.http.get<MessageItem[]>(this.actionUrl).pipe(
            catchError(this.handleError)
        );
    }

    getSingleMessage(id: number): Observable<MessageItem> {
        return this.http.get<MessageItem>(this.actionUrl + id).pipe(
            catchError(this.handleError)
        );
    }

    addMessage(model: MessageItemCreate): Observable<MessageItem> {
        return this.http.post<MessageItem>(`${this.baseUrl}/api/message-items`, model).pipe(
            catchError(this.handleError)
        );
    }

    updateMessage(messageToUpdate: MessageItem) {
        return this.http.put<MessageItem>(this.actionUrl + '?id=' +messageToUpdate.id, messageToUpdate).pipe(
            catchError(this.handleError)
        );
    }

    deleteMessage(id: number) {
        return this.http.delete(this.actionUrl + '?id=' + id).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: Response) {
      return throwError(error || 'Server error');
    }
}