import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Customers } from "../types/customer";

@Component({
    selector: 'app-customer-list',
    template: `
        <details open class="container striped">
            <summary role="button" class="outline" [attr.disabled]="nbOfCustomers < 1 ? true : null">Voir les clients ({{nbOfCustomers}})</summary>

            <input
                type="search"
                name="search"
                placeholder="Chercher par nom"
                aria-label="Search"
                (input)="searchInputChange($event)"
                />

            <table class="container striped table-layout">
                <thead data-theme="light">
                    <tr>
                        <th style="text-align: center;">Numéro</th>
                        <th style="text-align: center;">Nom Complet</th>
                        <th style="text-align: center;">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let customer of customers">
                        <td style="text-align: center;">{{customer.id}}</td>
                        <td style="text-align: center;"><a routerLink="/{{ customer.id }}">{{customer.fullName}}</a></td>
                        <td style="text-align: center;">{{customer.email}}</td>
                    </tr>
                </tbody>
            </table>           
        </details>
    `
})

export class CustomerListComponent {

    @Input()
    customers: Customers = []
    @Input()
    nbOfCustomers: number = 0

    @Output()
    onSearch = new EventEmitter<string>()


    
    /**
     * 
     * Filtrer les clients par leurs noms complets.
     * 
     * @param event nom complet reçue par le fils.
     */
    searchInputChange(event: Event) {
        const value = (event.target as HTMLInputElement)?.value;
        if (value !== undefined) {
            this.onSearch.emit(value);
        }
    }
    
}