import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Images} from '../interfaces/images';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  images: Images[] = [
    {
      source: '../../assets/swimming.jpg',
      alt: 'swimming_pool'
    },
    {
      source: '../../assets/spa.jpg',
      alt: 'spa'
    },
    {
      source: '../../assets/reception.jpg',
      alt: 'reception'
    },
    {
      source: '../../assets/golf.jpg',
      alt: 'golf'
    },
    {
      source: '../../assets/room.jpg',
      alt: 'room'
    }
  ];

  constructor() { }

  ngOnInit() {
    $.getScript('../../assets/js/script.js');
    $.getScript('../../assets/image-partial-view-slider/dist/partialviewslider.js');
  }

}
