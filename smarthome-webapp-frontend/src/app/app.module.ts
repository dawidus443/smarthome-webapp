import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RoomService } from './room.service';
import { MonitorComponent } from './monitor/monitor.component';
import { AppRoutingModule } from './app-routing.module';
import { RoomViewComponent } from './room-view/room-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    RoomViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    AppRoutingModule
  ],
  providers: [RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
