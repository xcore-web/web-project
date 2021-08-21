import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MessageItem } from 'src/app/shared/_models/message-item.model';
import { MessageDataService } from 'src/app/shared/_services/message-data.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent {

  @Input() messageItems = [];

  @Output() messageSaved = new EventEmitter();
  @Output() messageDeleted = new EventEmitter();

  form: FormGroup;
  //created = new FormControl(new Date());

  constructor(
    formBuilder: FormBuilder,
    private readonly messageDataService: MessageDataService
  ) {
    this.form = formBuilder.group({
      id: null,
      userName: ['', Validators.required],
      messageName: ['', Validators.required],
      created: [new Date()]
    })
  }

  saveMessage() {
    this.messageSaved.emit(this.form.value);
    this.form.reset();
  }

  setMessageItemToEdit(messageItem: MessageItem) {
    const { messageName, userName, created, id } = messageItem;
    this.form.patchValue({ messageName, userName, created, id });
  }

  deleteMessageItem(messageItem: MessageItem) {
    this.messageDeleted.emit(messageItem);
  }
}
