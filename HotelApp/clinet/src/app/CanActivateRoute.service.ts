import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CanActivateRouteService implements CanActivate {
  constructor(
    private apollo: Apollo
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.apollo
    .watchQuery({
      query: gql`
        {
          me {
            id
          }
        }
      `,
    })
    .valueChanges.pipe(map(((res: any) => {
      console.log('canActivate', res);
      return true;
    })));
  }
}
