
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from './room';
import { RoomService } from './room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent {

    [x: string]: any;
    public rooms: Room[] = [];
    public editRoom: Room | undefined;
    public deleteRoom: Room | undefined;
  
  
    constructor(private roomService: RoomService, private router:Router) { }
  
    goToPage(pageName:string):void{
      this.router.navigate([`${pageName}`]);
    }
  
    ngOnInit() {
      this.getRooms();
      
    }
  
    // public getHC(): any{
    //   this.roomService.getNumberOfPIRSensors().subscribe(
    //     {
    //       next:(response: number) =>{
    //         this.name = response;
    //         console.log(this.name);
    //       },
    //       error:(error: HttpErrorResponse) => {
    //         alert(error.message);
    //       }
    //     }
    //   )
    // }
  
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
