import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },

  {
    path: 'contacts',
    loadChildren: () =>
      import('./views/contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'about-me',
    loadChildren: () =>
      import('./views/about-me/about-me.module').then((m) => m.AboutMeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
