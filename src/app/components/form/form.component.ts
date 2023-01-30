import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as Leaflet from 'leaflet';
import "leaflet-control-geocoder";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../services/storage.service";

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-form', templateUrl: './form.component.html', styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() showMap = new EventEmitter<boolean>();
  myForm!: FormGroup;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })], zoom: 11, center: {lat: 35.695782, lng: 51.395416}
  };
  locTypes = ['Business', 'Market', 'Home']

  constructor(private fb: FormBuilder,private storageService:StorageService) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      locationName: [''],
      locationAddress: [''],
      locationType: [''],
      logo: [''],
    });
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, {draggable: data.draggable})
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  mapClicked($event: any) {
    if (this.markers.length != 0) {
      this.map.removeLayer(this.markers[0])
      this.markers.splice(0, 1)
    }
    const data = {
      position: {lat: $event.latlng.lat, lng: $event.latlng.lng}, draggable: false
    }
    this.myForm.controls['locationAddress'].setValue(data.position)
    const marker = this.generateMarker(data, this.markers.length - 1);
    marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
    this.markers.push(marker);
  }

  submitForm(form: FormGroup) {
    if (Object.keys(this.myForm.value.locationAddress).length){
    this.storageService.setDataToStorage(this.myForm.value);
    }
    this.showMap.emit(true)
  }

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.myForm.controls['logo'].setValue(files[0])
  }
}
