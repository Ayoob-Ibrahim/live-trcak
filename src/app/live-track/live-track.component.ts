import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapComponent } from '../components/map/map.component';
import { ScalelineComponent } from '../components/scaleline/scaleline.component';
import { MousePositionComponent } from '../components/mouse-position/mouse-position.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-track',
  standalone: true,
  imports: [MapComponent, ScalelineComponent, MousePositionComponent,CommonModule ],
  templateUrl: './live-track.component.html',
  styleUrl: './live-track.component.scss',
})
export class LiveTrackComponent {


  map: Map;

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }

}
