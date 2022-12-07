
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from './room';
import { RoomService } from './room.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})

export class RoomViewComponent {

    statusAntiBurglaryPIR: BehaviorSubject<string> = new BehaviorSubject('');
    statusAntiBurglaryHC: BehaviorSubject<string> = new BehaviorSubject('');
    statusAntiFire: BehaviorSubject<string> = new BehaviorSubject('');
    statusWeather: BehaviorSubject<string> = new BehaviorSubject('');

    [x: string]: any;
    public rooms: Room[] = [];
    public editRoom: Room | undefined;
    public deleteRoom: Room | undefined;
  
  
    constructor(private roomService: RoomService, private router:Router, private httpClient: HttpClient) { 
      this.httpClient.get(environment.apiBaseUrl + '/room/module/anti-burglary/PIR', {responseType: 'text'}).subscribe(statusAntiBurglaryPIR => {
        this.statusAntiBurglaryPIR?.next(statusAntiBurglaryPIR);
      });

      this.httpClient.get(environment.apiBaseUrl + '/room/module/anti-burglary/HC', {responseType: 'text'}).subscribe(statusAntiBurglaryHC => {
        this.statusAntiBurglaryHC?.next(statusAntiBurglaryHC);
      });
      this.httpClient.get(environment.apiBaseUrl + '/room/module/anti-fire', {responseType: 'text'}).subscribe(statusAntiFire => {
        this.statusAntiFire?.next(statusAntiFire);
      });
      this.httpClient.get(environment.apiBaseUrl + '/room/module/weather', {responseType: 'text'}).subscribe(statusWeather => {
        this.statusWeather?.next(statusWeather);
      });
      
    }
  


    goToPage(pageName:string):void{
      this.router.navigate([`${pageName}`]);
    }
  
    exit() {
      window.location.reload();
   }

    ngOnInit() {
      this.getRooms();
      
    }
  
    public getRooms(): void{
      this.roomService.getRooms().subscribe(
        {  
          next:(response: Room[]) =>{
            this.rooms = response;
          },
          error:(error: HttpErrorResponse) => {
            alert(error.message);
          }
        }    
      );
    }
  
    public onAddRoom(addForm: NgForm): void{
      document.getElementById('add-room-form')?.click();
      this.roomService.addRoom(addForm.value).subscribe(
        {
          next:(response: Room) => {
            console.log(response);
            this.getRooms();
            addForm.reset();
          },
          error:(error: HttpErrorResponse) => {
            alert(error.message);
            addForm.reset();
          }
        }
      )
    }
  
    public onUpdateRoom(room: Room): void{
      this.roomService.updateRoom(room).subscribe(
        {
          next:(response: Room) => {
            console.log(response);
            this.getRooms();
          },
          error:(error: HttpErrorResponse) => {
            alert(error.message);
          }
        }
      )
    }
  
    public onDeleteRoom(roomId: number): void{
      this.roomService.deleteRoom(roomId).subscribe(
        {
          next:(response: void) => {
            console.log(response);
            this.getRooms();
          },
          error:(error: HttpErrorResponse) => {
            alert(error.message);
          }
        }
      )
    }
  
    public searchRooms(key: string): void{
      console.log(key);
      const results: Room[] = [];
      for(const room of this.rooms){
        if(room.roomName.toLowerCase().indexOf(key.toLowerCase())!== -1){
          results.push(room);
        }
      }
      this.rooms = results;
      if(results.length === 0 || !key){
        this.getRooms();
      }
    }
  
  
    public onOpenModal(room: Room, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal')
      if (mode  === 'add'){
        button.setAttribute('data-target', '#addRoomModal')
      }
      if (mode  === 'edit'){
        this.editRoom = room;
        button.setAttribute('data-target', '#updateRoomModal')
      }
      if (mode  === 'delete'){
        this.deleteRoom = room;
        button.setAttribute('data-target', '#deleteRoomModal')
      }
      container?.appendChild(button);
      button.click();
    }
    

}
