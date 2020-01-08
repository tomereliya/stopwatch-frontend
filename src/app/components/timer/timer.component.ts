import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { faPlay, faPause, faStopwatch, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  minutes : string = "00";
  seconds : string = "00";
  milliseconds : string = "00";
  lastUpdateTime: number;
  currentTimer: number = 0;
  timerToggledText: string ="Play";
  interval: number;
  icon: IconDefinition = faPlay;
  faStopwatch: IconDefinition = faStopwatch;
  faTrashAlt: IconDefinition = faTrashAlt;
  flickClass: string = "colon";

  @Output() addEvent = new EventEmitter<string>();
  @Output() resetEvent = new EventEmitter();

  constructor(private apiService : ApiService) {
  }

  ngOnInit() {

  }

  toggleTimer = () => {
    if(this.timerToggledText == "Play"){
      this.startTimer();
    } else{
      this.stopTimer();
    }
  };

   startTimer = () => {
      this.timerToggledText = "Pause";
      this.flickClass = "colon blink";
      this.icon = faPause;
      this.lastUpdateTime = new Date().getTime();
      this.interval = setInterval(this.updateTimer, 1);
   };

   stopTimer = () => {
     this.timerToggledText = "Play";
     this.flickClass = "colon";
     this.icon = faPlay;
     clearInterval(this.interval);
   };

   updateTimer = () => {
    let now = new Date().getTime();
    let diff = now - this.lastUpdateTime;

    this.currentTimer += diff;

    let time = new Date(this.currentTimer);

    this.minutes = this.padWithZero(time.getMinutes());
    this.seconds = this.padWithZero(time.getSeconds());
    this.milliseconds = this.padWithZero(Math.floor(time.getMilliseconds()/ 10));
    this.lastUpdateTime = now;
  };

   padWithZero = (num) => {
    return ('00' + num).substr(-2);
  };

   getTimeAsString = () => {
     return this.minutes + ":" + this.seconds + "." + this.milliseconds;
   };

  resetTimeStr = () => {
    this.minutes = "00";
    this.seconds = "00";
    this.milliseconds = "00";
  };

  addTime = () => {
    this.apiService.addTime(this.getTimeAsString()).subscribe((time) => {
      this.addEvent.emit(time);
    });
  };


  ResetTime = () => {
    this.apiService.resetTime().subscribe(() => {
      this.resetEvent.emit();
      this.stopTimer();
      this.currentTimer = 0;
      this.resetTimeStr();
    });
  };

}

