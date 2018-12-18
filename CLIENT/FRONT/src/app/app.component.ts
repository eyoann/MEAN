import { Component, OnInit } from '@angular/core';
import { AuthService} from './membres/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogging = false;
  title = 'FRONT';
  constructor(private auth: AuthService) { }

  ngOnInit() {
  	this.isLogging = this.auth.LoggedIn();
  }
}
