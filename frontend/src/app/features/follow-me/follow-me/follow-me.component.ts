import {Component} from '@angular/core';
import {delay} from "rxjs";

@Component({
  selector: 'app-follow-me',
  templateUrl: './follow-me.component.html',
  styleUrls: ['./follow-me.component.scss']
})
export class FollowMeComponent {

  sliderValue = 0;
  coinsEarned = 0;

  async change($event: Event) {
    this.sliderValue = ($event.target as any).value;

    if (this.sliderValue <= 250) {
      for (let i = this.sliderValue; i > 0; i--) {
        ($event.target as any).value = i;
        await delay(100);
      }
      this.sliderValue = 0;
    } else {
      for (let i = this.sliderValue; i < 500; i++) {
        ($event.target as any).value = i;
        await delay(100);
      }
      this.sliderValue = 500;
    }
  }
}
