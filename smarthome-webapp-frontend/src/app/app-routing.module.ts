import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonitorComponent } from './monitor/monitor.component';
import { RoomViewComponent } from './desing/design.component';


const routes: Routes = [
    {path:'monitor', component: MonitorComponent},
    {path:'desing-your-smarthome', component: RoomViewComponent},
    {path:'home', component: HomeComponent},
    {path:'', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}