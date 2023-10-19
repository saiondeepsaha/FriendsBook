import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  /* entryComponents: [HeaderComponent], */
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
