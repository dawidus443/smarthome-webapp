import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from './room';
import { RoomService } from './room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public rooms: Room[] = [];
  public editRoom: Room | undefined;

  constructor(private roomService: RoomService) { }

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
      button.setAttribute('data-target', '#deleteRoomModal')
    }
    container?.appendChild(button);
    button.click();
  }


}
