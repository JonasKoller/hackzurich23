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
  currentProgress = 0;


  async change($event: Event) {
    this.sliderValue = ($event.target as any).value;

    if (this.sliderValue <= 250) {
      for (let i = this.sliderValue; i > 0; i--) {
        ($event.target as any).value = i;
        await this.delay(1);
      }
      this.sliderValue = 0;
    } else {
      for (let i = this.sliderValue; i < 500; i++) {
        ($event.target as any).value = i;
        await this.delay(1);
      }
      this.sliderValue = 500;
      setTimeout(() => this.earnPoints(), 0);
    }
    this.currentProgress = 0;
    this.coinsEarned = 0;
  }

  async earnPoints() {
    while (this.sliderValue == 500) {
      await this.delay(1000);
      this.currentProgress++;
      if (this.currentProgress == 100) {
        this.coinsEarned++;
        this.currentProgress = 0;
      }
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
