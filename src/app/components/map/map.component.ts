import { Component, AfterViewInit } from '@angular/core';

declare const google: any; // Declare google to avoid TypeScript errors

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})


export class MapComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
}
