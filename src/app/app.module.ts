import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ContactsComponent } from './views/contacts/contacts.component';
import { AboutMeComponent } from './views/about-me/AboutMeComponent';
import { RouterModule, Routes } from '@angular/router';
import { AppSidebarComponent } from './views/app-sidebar/app-sidebar.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'about', component: AboutMeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AboutMeComponent,
    AppSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
