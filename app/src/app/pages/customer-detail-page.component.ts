import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { CustomerApiService } from "../services/customer-api.service";
import { InvoiceApiService } from "../services/invoice-api.service";
import { Customer } from "../types/customer";
import { Invoices } from "../types/invoice";

@Component({
    selector: 'app-customer-detail-page',
    template: `

    <nav class="conatiner margin-30">
        <ul>
            <li>
                <a routerLink="/"><img src="https://www.juba-ouarab.fr/invoices/assets/logo.png" class="logo" alt="logo"></a>
            </li>
        </ul>
        <ul>
            <li><a routerLink="/">Retour aux clients</a></li>
            <li><a routerLink="/{{this.id}}/invoices/add">Nouvelle facture</a></li>
        </ul>
    </nav>

    <article class="margin-30 border-purple">

        <header>
            <div class="container container-centred">
                <h2 class="centred">Détails du client</h2>
            </div>
        </header>

        <section>
            <app-customer-detail
                [customer]="customer"
                [nbOfInvoices]="nbOfInvoices"
            />
        </section>

        <hr>

        <section>
            <div class="container container-centred">
                <a routerLink="/{{this.id}}/invoices/add" class="margin-30">
                    <button class="outline">Créer une facture</button>
                </a>
            </div>
        </section>

        <footer>

            <section>
                <app-invoice-list
                    [invoices]="invoices"
                    [nbOfInvoices]="nbOfInvoices"
                    (onUpdateInvoices)="onUpdateInvoices()"
                />
            </section>

        </footer>

    </article>
    `
})

export class CustomerDetailPageComponent {

    customer?: Customer;
    invoices: Invoices = []
    nbOfInvoices: number = 0
    id: number = 0

    constructor(
        private route: ActivatedRoute, 
        private customerApiService: CustomerApiService,
        private invoiceApiService: InvoiceApiService,
        private router: Router
    ) { }

    ngOnInit() {

        this.id = Number(this.route.snapshot.paramMap.get('id'))

        this.findCustomerById()
        this.findAllInvoicesByCostumerId()

    }



    /**
     * Trouver le client.
     */
    findCustomerById() {
        this.customerApiService
        .findOne(this.id)
        .subscribe(
            customers => {
                this.customer = customers[0]
                if(this.customer === undefined){
                    console.error('Not Found - GET custumer')
                    this.router.navigate(["/not-found/message"])
                }
            },
            error => {
                console.error('Error - GET custumer', error)
                this.router.navigate(["/error/message"])
            }
        )
    }



    /**
     * Trouver les factures du client.
     */
    findAllInvoicesByCostumerId() {
        this.invoiceApiService
        .findAllByCostumerId(this.id)
        .subscribe(
            invoices => {
                this.invoices = invoices
                this.nbOfInvoices = invoices.length
            },
            error => {
                console.error('Error - GET invoices', error)
                this.router.navigate(["/error/message"])
            }
        )
    }



    /**
     * Mettre à jour les factures du client.
     */
    onUpdateInvoices(): void {
        this.findAllInvoicesByCostumerId()
    }

}