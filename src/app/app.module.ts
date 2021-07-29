//Modules
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//Components
import { AppComponent } from './app.component';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfirmationMessageComponent } from './components/shared/confirmation-message/confirmation-message.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddEditEmployeeComponent,
    ListEmployeeComponent,
    NavbarComponent,
    ConfirmationMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConfirmationMessageComponent],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
