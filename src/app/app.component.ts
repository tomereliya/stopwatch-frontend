import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  times: Array<string> = [];
  userId: string;

  constructor(private apiService: ApiService,  private cookieService : CookieService){
  }

  ngOnInit(): void {
    this.userId = this.cookieService.get("userId");
    this.apiService.getTimes(this.userId).subscribe( ((res: Array<any>) => {
      res.forEach(time => {
        this.times.push(time.time);
      });
    }));

  }

   addEvent = ($event) => {
    this.times.push($event);
};

  resetEvent = () => {
    this.times = [];
  };

}
