import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../services/@AutoUnsubscribe.decorator";
import {HttpService} from "../../services/http.service";

interface ISupplier {


}

@Component({
    selector: 'supplier-view',
    templateUrl: 'supplier.component.html'
})
@AutoUnsubscribe()
export class SupplierView {
    suppliers: ISupplier[];

    constructor(
        public httpService: HttpService
    ) {



    }




}