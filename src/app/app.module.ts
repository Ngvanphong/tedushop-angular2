import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoute} from './app.routes';
import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {MainModule} from './main/main.module';
import {AuthGuard} from './core/guards/auth.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute, { useHash: true }),
    PaginationModule.forRoot(),
    LoginModule,
    MainModule,
    

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
