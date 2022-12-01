import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { RoomViewComponent } from './room-view/room-view.component';


const routes: Routes = [
    {path:'Monitor', component: MonitorComponent},
    {path:'roomView', component: RoomViewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}