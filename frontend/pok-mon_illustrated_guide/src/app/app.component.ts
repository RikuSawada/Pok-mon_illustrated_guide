import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {VirtualEmployeeApiService} from "../infra/VirtualEmployeeApi/VirtualEmployeeApiService";
import {HttpRequestService} from "../util/Service/Http/httpRequestService";
import {HeaderComponent} from "./common-parts/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpRequestService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [VirtualEmployeeApiService]
})
export class AppComponent {
  title = 'virtual-employee';
}
