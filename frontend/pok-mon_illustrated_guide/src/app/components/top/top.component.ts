import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {
  KeyboardNavigationComponent
} from "../../common-parts/keyboard-navigation/keyboard-navigation.component";

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [
    RouterOutlet,
    KeyboardNavigationComponent
  ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  constructor(private _router: Router) {

  }

  navigate(path: string): void {
    this._router.navigate([path]);
  }
}
