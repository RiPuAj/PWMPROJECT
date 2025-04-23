import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(HttpClientModule), provideFirebaseApp(() => initializeApp({ projectId: "tournamaker-7deca", appId: "1:441629400942:web:9898a5702ab29c9156ab7f", storageBucket: "tournamaker-7deca.firebasestorage.app", apiKey: "AIzaSyDwVeiZ4llJxpuJ72t5mFMfkQBl1rpaIkA", authDomain: "tournamaker-7deca.firebaseapp.com", messagingSenderId: "441629400942" })), provideFirestore(() => getFirestore())
  ]
};
