import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Customer } from "../types/customer";
import { CustomerApiService } from "../services/customer-api.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-customer-detail',
    template: `
        <ng-container *ngIf="customer">
            <div class="grid container">
                <div class="container-centred margin-30">{{customer.id}}</div>
                <div class="container-centred margin-30">{{customer.fullName}}</div>
                <div class="container-centred margin-30">{{customer.email}}</div>
                <div class="container-centred margin-30">
                    <span (click)="onDeleteClick()" class="delete">Supprimer</span>
                </div>
            </div>

            <dialog [open]="openModal" (close)="onCancelClick()">
                <article>
                    <h2>Êtes-vous sûr ?</h2>
                    <p>Si vous supprimez ce client, vous allez perdre ses informations ainsi que toutes ses factures : </p>
                    <ul>
                        <li>Nom : {{customer.fullName}}</li>
                        <li>Email : {{customer.email}}</li>
                        <li>Nombre de factures : {{nbOfInvoices}}</li>
                    </ul>
                    <footer>
                        <button class="secondary" (click)="onCancelClick()">Annuler</button>
                        <button class="confirm" (click)="onConfirmClick()">Confirmer</button>
                    </footer>
                </article>
            </dialog>
        </ng-container>

        <div *ngIf="!customer" class="container">
            <div class="grid container">
                <div class="container-centred margin-30">
                    <article aria-busy="true"> Récupération des informations en cours...</article>
                </div>
            </div>
        </div>
    `
})

export class CustomerDetailComponent {

    @Input()
    customer?: Customer;
    @Input()
    nbOfInvoices: number = 0

    openModal: boolean = false

    constructor(
        private customerApiService: CustomerApiService,
        private router: Router
    ) { }



    /**
     * Supprimer le client.
     */
    onDeleteClick() {
        this.openModal = true
    }



    /**
     * Accepter la modal de suppression.
     */
    onConfirmClick() {
        if(this.customer != undefined && this.customer.id != undefined){
            this.customerApiService
            .remove(this.customer.id)
            .subscribe(
                () => {
                    this.router.navigate(['/']); 
                },
                error => {
                    console.error('Error - DELETE custumer', error)
                    this.router.navigate(["/error/message"])
                }
            )
        }
    }



    /**
     * Refuser la modal de suppression.
     */
    onCancelClick() {
        this.openModal = false
    }

}