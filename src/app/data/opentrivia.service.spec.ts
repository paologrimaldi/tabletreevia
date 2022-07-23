import { TestBed } from '@angular/core/testing';

import { OpentriviaService } from './opentrivia.service';

describe('OpentriviaService', () => {
  let service: OpentriviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpentriviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
