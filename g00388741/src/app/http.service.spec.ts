import { TestBed } from '@angular/core/testing';

import { HttpData } from './http.service';

describe('HttpData', () => {
  let service: HttpData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
