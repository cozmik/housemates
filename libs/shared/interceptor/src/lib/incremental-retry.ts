import {Observable, throwError, timer} from 'rxjs';
import {finalize, mergeMap} from 'rxjs/operators';

export const incrementalRetry =
  ({maxRetryAttempts = 3, scalingDuration = 1000, excludedStatusCodes = [], headerAllow = 'true', request = ''}:
     {
       maxRetryAttempts?: number,
       request?: any,
       scalingDuration?: number,
       excludedStatusCodes?: number[],
       headerAllow?: string
     } = {}) => (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)
          || headerAllow === 'false' || request.method === 'PUT' || request.method === 'POST'
        ) {
          console.log(request);
          return throwError(error);
        }
        console.log(
          `Attempt ${retryAttempt}: retrying in ${retryAttempt *
          scalingDuration}ms`
        );
        // console.log(request.method);

        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => console.log('We are done!'))
    );
  };
