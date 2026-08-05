import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { LanguageService } from '../services/language.service';

/** Default HTTP timeout duration in milliseconds (15 seconds) */
export const DEFAULT_TIMEOUT_MS = 15000;

/** Token to specify a custom timeout duration in ms for a specific request */
export const REQUEST_TIMEOUT = new HttpContextToken<number>(() => DEFAULT_TIMEOUT_MS);

/** Token to bypass timeout handling for a specific request (e.g. file upload) */
export const BYPASS_TIMEOUT = new HttpContextToken<boolean>(() => false);

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  const isBypassed = req.context.get(BYPASS_TIMEOUT);
  if (isBypassed) {
    return next(req);
  }

  const timeoutMs = req.context.get(REQUEST_TIMEOUT);
  const toastService = inject(ToastService);
  const translate = inject(TranslateService);
  const langService = inject(LanguageService);

  return next(req).pipe(
    timeout(timeoutMs),
    catchError((error) => {
      const isTimeout =
        error instanceof TimeoutError ||
        error?.name === 'TimeoutError' ||
        error?.status === 408 ||
        error?.status === 504 ||
        error?.status === 0 ||
        error?.error?.cause?.name === 'ConnectTimeoutError';

      if (isTimeout) {
        const fallbackMsg =
          langService.currentLang() === 'ar'
            ? 'استغرقت الاستجابة وقتاً أطول من المتوقع، يرجى المحاولة لاحقاً.'
            : 'The request timed out. Please try again later.';
        
        const message = translate.instant('ERRORS.TIMEOUT') || fallbackMsg;
        toastService.error(message);

        // Normalize to HttpErrorResponse if it's an RxJS TimeoutError
        const formattedError =
          error instanceof HttpErrorResponse
            ? error
            : new HttpErrorResponse({
                error: { message: 'Request Timeout' },
                status: 408,
                statusText: 'Request Timeout',
                url: req.url,
              });

        return throwError(() => formattedError);
      }

      return throwError(() => error);
    })
  );
};
