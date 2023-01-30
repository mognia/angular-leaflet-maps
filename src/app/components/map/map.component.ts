import {Component, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';
import {StorageService} from "../../services/storage.service";

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 11, center: {lat: 35.695782, lng: 51.395416}
  }
  data!: object[];

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
  }

  initMarkers() {
    const initialMarkers = this.storageService.getDataFromStorage();
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<p>Location Name: ${data.locationName}</p><p>Location Type: ${data.locationType}</p>`);
      this.map.panTo(data.locationAddress);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.locationAddress)
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }


}
