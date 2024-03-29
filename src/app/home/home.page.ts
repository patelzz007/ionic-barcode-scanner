import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonItem,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  providers: [InAppBrowser],
  imports: [
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonLabel,
    IonItem,
    IonInput,
    IonFab,
    IonFabButton,
    IonIcon,
    NgFor,
    NgIf,
  ],
})
export class HomePage implements OnInit {
  public isSupported = false;
  public barcodes!: Barcode[];
  public barcodeResults!: any;
  private brow: any;

  constructor(
    private alertController: AlertController,
    private inAppBrowser: InAppBrowser
  ) {
    addIcons({ add });
  }

  ngOnInit() {
    this.barcodes = [];
    BarcodeScanner.isSupported().then((result) => {
      console.log('Barcode Scanner result: ', result);
      this.barcodeResults = result;
      this.isSupported = result.supported;
    });
  }

  public inAppBrowser123(): void {
    const url = 'https://www.google.com';
    this.brow = this.inAppBrowser.create(
      url,
      'presentationstyle=formsheet,toolbarposition=top,fullscreen=no,hideurlbar=yes,toolbarcolor=#176bff,closebuttoncolor=#ffffff,navigationbuttoncolor=#ffffff'
    );
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    alert(granted);
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
