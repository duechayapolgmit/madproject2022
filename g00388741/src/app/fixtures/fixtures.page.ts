import { Component, OnInit } from '@angular/core';
import { HttpData } from '../http.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.page.html',
  styleUrls: ['./fixtures.page.scss'],
})
export class FixturesPage implements OnInit {

  constructor(private dataGrab: HttpData) { }

  fixtures: Array<any>;

  ngOnInit() {
    this.fixtures = this.dataGrab.fixtures;
  }

}
