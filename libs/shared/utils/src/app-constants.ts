import {HttpHeaders} from "@angular/common/http";

export class AppConstants {
  static getNoTokenHeaders(retry = 'true', popupError = 'false'): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'No-Auth': 'true',
        TokenRefresh: 'false',
        retry,
        popupError
      })
    };
  }

  static RefreshTokenHttpHeaders(retry = 'true', popupError = 'false'): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'No-Auth': 'true',
        TokenRefresh: 'true',
        retry,
        popupError,
      })
    };
  }

  static getTokenHttpHeaders(retry = 'true', popupError = 'false'): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'No-Auth': 'false',
        TokenRefresh: 'false',
        retry,
        'popup-error': popupError
      })
    };
  }

  static getFormDataTokenHttpHeaders(retry = 'true', popupError = 'false'): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'No-Auth': 'false',
        retry,
        'popup-error': popupError
      })
    };
  }
}

export const DateRanges: Record<string, string> = {
  'today': 'Today',
  'week': 'This Week',
  'month': 'This Month',
  'cumulative': 'All Times',
  'other': 'other'
}


export const AgeRange = [
  '18 - 20',
  '21 - 23',
  '23 - 25',
  '26 - 28',
  'Above 28'
]
