import {TestBed} from '@angular/core/testing';

import {UtilityService} from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBase64()', () => {
    it('should accept an input event, get the target file and return base64 string of the file', async () => {
      const file = new File([''], 'file');
      await expect(service.getBase64(file)).resolves.toContain('data:application');
    });

    test('should fails with an error', async () => {
      await expect(service.getBase64({} as File)).rejects.toThrowError();
    });
  });
});
