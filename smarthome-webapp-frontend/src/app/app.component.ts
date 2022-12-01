
import { Component, OnInit } from '@angular/core';

import { Room } from './desing/room';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  [x: string]: any;
  public rooms: Room[] = [];
  public editRoom: Room | undefined;
  public deleteRoom: Room | undefined;


  constructor( private router:Router) { }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  
}

