import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule, NbInputDirective, NbListModule, NbUserModule, NbActionsModule, NbSidebarModule, NbIconModule, NbToastrModule, NbToggleModule, NbRadioModule, NbSpinnerModule, } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameCategoryComponent } from './game-category/game-category.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountdownModule } from 'ngx-countdown';
import { NgFireworksModule } from '@fireworks-js/angular';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, GameCategoryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbListModule,
    NbUserModule,
    NbActionsModule,
    FormsModule, 
    NbIconModule,
    NbSidebarModule.forRoot(),
    RouterModule.forRoot([]),
    HttpClientModule,
    NbToastrModule.forRoot(),
    NbToggleModule,
    NbRadioModule,
    CountdownModule,
    NbSpinnerModule,
    NgFireworksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
