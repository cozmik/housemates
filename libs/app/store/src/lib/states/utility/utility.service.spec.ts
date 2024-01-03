import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UtilityService);

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return an array of StateModel of {name: string, id: string}', () => {
    const mockResponse = [
      {name: 'Abia', id: 'abia'},
      {name: 'Adamawa', id: 'adamawa'},
      {name: 'Akwa Ibom', id: 'akwa-ibom'},
      {name: 'Anambra', id: 'anambra'},
    ];
    service.getStates().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne('/api/states');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('accepts state id as argument and returns an array of string', () => {
    const mockResponse = ["Agege","Ajeromi-Ifelodun","Alimosho","Amuwo-Odofin"];
    const stateId = 'lagos';
    service.getLgas(stateId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(`/api/states/${stateId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });


});
