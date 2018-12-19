import { Component, OnInit } from '@angular/core';

import { RouterSlideAnimation } from '@animations';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    RouterSlideAnimation
  ]
})

export class DefaultComponent implements OnInit {

  constructor( ) { }

  ngOnInit() { }
}