import { Component } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Stroke, Style } from 'ol/style';
 
import { Subscription } from 'rxjs';
 
import { Router } from '@angular/router';
 
import { LineString } from 'ol/geom';
 
import { Coordinate } from 'ol/coordinate';
@Component({
  selector: 'app-track-icon',
  standalone: true,
  imports: [],
  templateUrl: './track-icon.component.html',
  styleUrl: './track-icon.component.scss'
})
export class TrackIconComponent {

  // private selectedFlightStatus!: selectedFlightStatus;
  private map!: Map;
  private vectorSource!: VectorSource;
  private vehicleFeature!: Feature;
  private vectorLayer!: VectorLayer<any>;
  private route: [number, number][] = [];
  private mqttSubscription!: Subscription;
  locations = [
    [80.257, 13.0602],
    [80.2497, 12.9791],
    [80.2707, 13.0806],
    [80.164, 12.9816],
    [80.2213, 12.9887],
  ];

  ngAfterViewInit(): void {
    this.initMap();
    // this.addLocations();
  }


  private initMap(): void {
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        image: new Icon({
          src: 'assets/vehicle-icon.png', // Path to your marker icon
          anchor: [0.5, 1],
          scale: 0.58,
        }),
      }),
    });
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      view: new View({
        center: fromLonLat([80.2707, 13.0837]), // Center the map on Chennai
        zoom: 8
      }),
    });
    this.map.on('click', (event) => {
      this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const clickedFeatureId = feature.get('id');
        console.log(clickedFeatureId, 'clickedFeatureId', feature);
        // this.handleMarkerClick(clickedFeatureId);
      });
    });
  }

}
