import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router"; 

import { Invoice } from "../types/invoice";
import { InvoiceApiService } from "../services/invoice-api.service";

@Component({
    selector: 'app-invoice-create-page',
    template: `

        <nav class="conatiner margin-30">
            <ul>
                <li>
                    <a routerLink="/"><img src="https://www.juba-ouarab.fr/invoices/assets/logo.png" class="logo" alt="logo"></a>
                </li>
            </ul>
            <ul>
                <li><a routerLink="/{{id}}">Retour au client</a></li>
            </ul>
        </nav>

        <article class="margin-30 {{borderClass}}">

            <header>
                <div class="container container-centred">
                    <h2 class="centred">Créer un nouvelle facture</h2>
                </div>
            </header>

            <app-invoice-form
                [customer]="id"
                (onNewInvoice)="createInvoice($event)"
                (onFormStateChange)="setBorderState($event)"
            />
        
        </article>
    `
})

export class InvoiceCreatePageComponent {

    borderClass: string = 'border-purple';

    id: number = 0



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private invoiceApiService: InvoiceApiService
    ) { }



    ngOnInit() {

        this.id = Number(this.route.snapshot.paramMap.get('id'))
        
    }



    /**
     * 
     * Créer une nouvelle facture. 
     * 
     * @param invoice facture à créer.
     * 
     */
    createInvoice(invoice: Invoice){
        this.invoiceApiService
            .create(invoice)
            .subscribe(
                () => {
                    this.router.navigate(["/"+this.id])
                },
                error => {
                    console.error('Error - POST invoice', error)
                    this.router.navigate(["/error/message"])
                }
            )
    }


    
    /**
     * 
     * Changer la couleur des bords du formulaire de création.
     * 
     * Couleurs possibles : Purple, Red & Green.
     * 
     * @param state état du formulaire (validé, non validé & non touché).
     * 
     */
    setBorderState(state: string): void {
        this.borderClass = state;
    }

}