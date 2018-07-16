import { HttpResponse } from '@angular/common/http';

 export class HttpResponseUtil {

  public static convertResponse<T>(res: HttpResponse<T>): HttpResponse<T> {
    const body: T = <T>this.convert(res.body);
    return res.clone({body});
  }

  public static convertResponseArray<T>(res: HttpResponse<T[]>): HttpResponse<T[]> {
    const jsonResponse: T[] = res.body;
    const body: T[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convert(jsonResponse[i]));
    }
    return res.clone({body});
  }

  public static convert<T>(item: T): T {
    const copy: T = Object.assign({}, item);
    return copy;
  }
}
