import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgStyle} from "@angular/common";
import {
  VirtualEmployeeApiService
} from "../../../infra/VirtualEmployeeApi/VirtualEmployeeApiService";
import {
  ChatRemoveRequestParams
} from "../../../infra/VirtualEmployeeApi/Params/ChatRemoveRequestParams";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ApiMessageDto} from "../../../util/WebDTO/chat/ApiMessageDto";
import {
  ApiErrorResponseHandlerService
} from "../../../util/Service/Error/ApiErrorResponseHandlerService/api-error-response-handler.service";
import {ApiErrorMessage} from "../../../util/Service/Error/ApiErrorMessage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [
    NgStyle,
    MatSnackBarModule, // MatSnackBarモジュールを追加
  ],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {
  @Input() id: string = ''; // メッセージID
  @Input() content: string = '';
  @Input() x!: number;
  @Input() y!: number;

  @Output() messageDeleted = new EventEmitter<void>();

  errorMessage: ApiErrorMessage | null = null;


  constructor(private virtualEmployeeApiService: VirtualEmployeeApiService,
              private errorHandler:ApiErrorResponseHandlerService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  copyMessage(): void {
    // コピー処理を実行
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.content).then(() => {
        // コピー成功のトースト通知
        this.snackBar.open('メッセージをコピーしました！', '閉じる', {
          duration: 2000, // 2000ミリ秒（2秒）表示
        });
      }).catch(err => {
        console.error('Failed to copy message to clipboard', err);
        // コピー失敗のハンドリングをここで実装可能
      });
    } else {
      // navigator.clipboardが利用不可能な場合のフォールバック処理
      console.error('Clipboard API not available');
    }
  }

  deleteMessage(): void {

    let webDto: ApiMessageDto = new ApiMessageDto('');

    this.virtualEmployeeApiService.post('/message/remove', new ChatRemoveRequestParams(this.id)).subscribe({
      next: (res) => {
        console.log(res);
        webDto.message = res.message;

        // 削除処理が完了し、webDtoにメッセージが設定されたらトーストを表示
        this.snackBar.open(webDto.message as string, '閉じる', {
          duration: 2000,
        });
        this.messageDeleted.emit(); // 削除処理完了を親コンポーネントへ通知
      },
      error: (error) => {
        console.error('Error:', error.message);
        this.errorMessage = this.errorHandler.handleError(error,this.router);

        // エラー処理
        console.error('Failed to delete message', error);
        this.snackBar.open('メッセージの削除に失敗しました', '閉じる', {
          duration: 2000,
        });
      }
    });

  }
}
