import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentESP } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent{

  status: BehaviorSubject<string> = new BehaviorSubject('');
  statusOpposite: string | undefined;

  constructor(private httpClient: HttpClient){
    this.httpClient.get(environmentESP.esp32LedServer + 'status', { responseType: 'text'}).subscribe(currentStatus => {
      this.status?.next(currentStatus);
    });
    this.status?.subscribe(currentStatus => {
      this.statusOpposite = currentStatus === 'OFF' ? 'ON' : 'OFF';
    });
  }

  toggleLed(){
    if(this.status?.value == "OFF"){
      this.httpClient.get(environmentESP.esp32LedServer + 'on', { responseType: 'text'}).subscribe();
      this.status?.next('ON');
    } else {
      this.httpClient.get(environmentESP.esp32LedServer + 'off', { responseType: 'text'}).subscribe();
      this.status?.next('OFF');
    }
  }
}
