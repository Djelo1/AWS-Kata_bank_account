import { TestBed } from '@angular/core/testing';

import { HttpCrossOriginInterceptor } from './http-cross-origin.interceptor';

describe('HttpCrossOriginInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpCrossOriginInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpCrossOriginInterceptor = TestBed.inject(HttpCrossOriginInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
