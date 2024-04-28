import { Component } from "@angular/core";
import { Router } from "@angular/router";


import { CustomerApiService } from "../services/customer-api.service";
import { Customers } from "../types/customer";

@Component({
    selector: "app-customer-list-page",
    template: `

    <nav class="conatiner margin-30">
        <ul>
            <li>
                <a routerLink="/"><img src="https://www.juba-ouarab.fr/invoices/assets/logo.png" class="logo" alt="logo"></a>
            </li>
        </ul>
        <ul>
            <li><a routerLink="/create">Nouveau client</a></li>
        </ul>
    </nav>

    <article class="margin-30 border-purple">

        <header>
            <div class="container container-centred">
                <h2 class="centred">Liste des clients</h2>
            </div>
        </header>

        <section>
            <div class="container container-centred">
                <a routerLink="/create" class="margin-30">
                    <button class="outline">Créer un client</button>
                </a>
            </div>
        </section>

        <footer>

            <section>

                <app-customer-list
                    [customers]="customers"
                    [nbOfCustomers]="nbOfCustomers"
                    (onSearch)="findCustomersByFullNameFilter($event)"
                />

            </section>

        </footer>

    </article>
    `
})

export class CustomerListPageComponent {

    customers: Customers = []
    nbOfCustomers: number = 0

    constructor(
        private customerApiService: CustomerApiService,
        private router: Router
    ) { }

    ngOnInit() {
        this.findAllCustomers()
    }



    /**
     * Trouver tous les clients.
     */
    findAllCustomers(){
        this.customerApiService
            .findAll()
            .subscribe(
                (customers) => {
                    this.customers = customers
                    this.nbOfCustomers = customers.length
                },
                error => {
                    console.error('Error - GET custumers', error)
                    this.router.navigate(["/error/message"])
                }
            )
    }



    /**
     * Fonction de recherche.
     * 
     * Trouver tous les clients correspondant à l'entrée utilisateur.
     * 
     * @param fullName entée utilisateur.
     */
    findCustomersByFullNameFilter(fullName: string){

        if(fullName.length < 1) {
            this.findAllCustomers()
        }

        else {
            this.customerApiService
                .filterByFullName(fullName)
                .subscribe(
                    (customers) => {
                        this.customers = customers
                        this.nbOfCustomers = customers.length
                    },
                    error => {
                        console.error('Error - GET custumers by filter', error)
                        this.router.navigate(["/error/message"])
                    }
                )
        }
    }

}