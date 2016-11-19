/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResourceService } from './resource.service';

describe('Service: Resource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceService]
    });
  });

  it('should ...', inject([ResourceService], (service: ResourceService) => {
    expect(service).toBeTruthy();
  }));
});
