/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComponentDataService } from './component-data.service';

describe('ComponentDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentDataService]
    });
  });

  it('should ...', inject([ComponentDataService], (service: ComponentDataService) => {
    expect(service).toBeTruthy();
  }));
});
