import {Component, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    MatNavList,
    RouterLink,
    MatSidenav,
    MatListItem,
    NgForOf,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // リンク先
  naviLinks = [
    {location: 'chat', label: 'チャット'},
    {location: 'mind-setting', label: '仮想社員の設定'},
    {location: 'user-setting', label: 'ユーザの設定'},

  ];

  @ViewChild('sidenav')
  private sidenav!: MatSidenav
  sidenavWidth: number = 200; // サイドナブの幅を指定

  constructor(private _router: Router) {
    // ページ遷移後、メニューを閉じる
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.sidenav && this.sidenav.mode == 'over' && this.sidenav.opened) {
          this.sidenav.close();
        }
      }

    });
  }

  // サイドナブを開閉する関数
  toggleSidenav() {
    this.sidenav.toggle();
  }

  navigateToHome() {
    this._router.navigate(['/top']);
  }

  logout() {
    this._router.navigate(['/logout']);
  }
}
