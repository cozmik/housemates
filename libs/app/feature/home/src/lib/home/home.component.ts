import {Component, inject} from '@angular/core';
import {faEnvelope, faQuoteLeft} from "@fortawesome/free-solid-svg-icons";
import {faApple, faGooglePlay} from "@fortawesome/free-brands-svg-icons";
import {Router} from "@angular/router";
import {UtilityState} from "@housemates/app/store";
import {ViewSelectSnapshot} from "@ngxs-labs/select-snapshot";
import {StateModel} from "@housemates/shared/model";
import {UtilityService} from "@housemates/app/store";
import {Observable, of, startWith} from "rxjs";

@Component({
  selector: 'housemates-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  quote = faQuoteLeft;
  apple = faApple;
  googlePlay = faGooglePlay;
  envelope = faEnvelope;
  router = inject(Router);
  utilityService = inject(UtilityService);
  @ViewSelectSnapshot(UtilityState.getStates) states?: StateModel[];
  lgas: Observable<string[]> = of([]);

  searchListings() {
    this.router.navigate(['listings']);
  }

  getLga(stateId: any) {
    this.lgas = this.utilityService.getLgas(stateId).pipe(
      startWith([])
    )
  }
}
