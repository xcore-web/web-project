import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageItem } from '../../_models/message-item.model';
import { MessageDataService } from '../../_services/message-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [DatePipe]
})
export class CommentsComponent implements OnInit {

  form: FormGroup;
  error: boolean;
  created = Date.now();

  messageItems$: Observable<MessageItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    private messageDataService: MessageDataService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getMessageData();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: null,
      userName: ['', Validators.required],
      messageName: ['', Validators.required],
      created: this.datePipe.transform(this.created)
    });
  }

  saveMessage(item: MessageItem) {
    if (item.id) {
      this.messageDataService.updateMessage(item).subscribe(
        () => console.log('Message Updated')
      );
    } else {
      this.messageDataService.addMessage(item).subscribe(
        () => console.log('Message Added')
      );
    }
    this.getMessageData();
    this.form.reset();
  }

  setMessageToEdit(messageItem: MessageItem) {
    const { userName, messageName, id } = messageItem;
    this.form.patchValue({ userName, messageName, id });
  }

  deleteMessage(item: MessageItem) {
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }

    this.messageDataService.deleteMessage(item.id).subscribe(
      () => console.log('Message Deleted')
    );
    this.getMessageData();
  }

  private getMessageData() {
    this.messageItems$ = this.messageDataService.getAllMessages();
  }
}
