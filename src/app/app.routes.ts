import { Routes } from '@angular/router';
import { TransliterateComponent } from './transliterate/transliterate.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'transliterate', component: TransliterateComponent },
];
