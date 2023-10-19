import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { registerActivateGuard } from './register-activate.guard';

describe('registerActivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registerActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
