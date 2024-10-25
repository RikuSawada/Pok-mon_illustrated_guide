import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {ApiErrorMessage} from "../../../util/Service/Error/ApiErrorMessage";

@Component({
  selector: 'app-error-message-area',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './error-message-area.component.html',
  styleUrl: './error-message-area.component.css'
})
export class ErrorMessageAreaComponent {

  @Input() errorMessage:ApiErrorMessage | undefined;

}
