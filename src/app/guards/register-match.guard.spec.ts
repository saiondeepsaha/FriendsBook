import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { registerMatchGuard } from './register-match.guard';

describe('registerMatchGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registerMatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
