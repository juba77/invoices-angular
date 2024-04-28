import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Customer } from "../types/customer";
import { CustomerApiService } from "../services/customer-api.service";

@Component({
    selector: 'app-customer-create-page',
    template: `

        <nav class="conatiner margin-30">
            <ul>
                <li>
                    <a routerLink="/"><img src="https://www.juba-ouarab.fr/invoices/assets/logo.png" class="logo" alt="logo"></a>
                </li>
            </ul>
            <ul>
                <li><a routerLink="/">Retour aux clients</a></li>
            </ul>
        </nav>

        <article class="margin-30 {{borderClass}}">

            <header>
                <div class="container container-centred">
                    <h2 class="centred">Créer un nouveau client</h2>
                </div>
            </header>

                <app-customer-form
                    (onNewCustomer)="createCustomer($event)"
                    (onFormStateChange)="setBorderState($event)"
                />

        </article>
    `
})

export class CustomerCreatePageComponent {

    borderClass: string = 'border-purple';

    constructor(
        private router: Router,
        private customerApiService: CustomerApiService
    ) { }



    /**
     * 
     * Créer un nouveau client.
     * 
     * @param customer client à créer.
     * 
     */
    createCustomer(customer: Customer){
        this.customerApiService
            .create(customer)
            .subscribe(
                () => {
                    this.router.navigate(['/']); 
                },
                error => {
                    console.error('Error - POST custumer', error)
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