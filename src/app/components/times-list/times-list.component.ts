import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-times-list',
  templateUrl: './times-list.component.html',
  styleUrls: ['./times-list.component.scss']
})
export class TimesListComponent implements OnInit {

  @Input() times : Array<string>;

  constructor(private apiService : ApiService) { }

  ngOnInit() {
  }

  removeTime = (time: string) => {
    this.apiService.removeTime(time).subscribe(() => {
      this.times.splice(this.times. indexOf(time),1);
    })
  };

}
