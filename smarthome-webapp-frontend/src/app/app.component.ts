import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Room } from './room';
import { RoomService } from './room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public rooms: Room[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.getRooms();
  }

  public getRooms(): void{
    this.roomService.getRooms().subscribe(
      (response: Room[]) =>{
        this.rooms = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
      button.setAttribute('data-target', '#updateRoomModal')
    }
    if (mode  === 'delete'){
      button.setAttribute('data-target', '#deleteRoomModal')
    }
    container?.appendChild(button);
    button.click();
  }


}
