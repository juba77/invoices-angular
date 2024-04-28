import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Invoices } from "../types/invoice";
import { InvoiceApiService } from "../services/invoice-api.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-invoice-list',
    template: `
        <details close class="container striped">
            <summary role="button" class="outline" [attr.disabled]="nbOfInvoices < 1 ? true : null">Voir les factures ({{nbOfInvoices}})</summary>
            <table class="container striped table-layout">
                <thead data-theme="light">
                    <tr>
                        <th style="text-align: center;">Référence</th>
                        <th style="text-align: center;">Montant (€)</th>
                        <th style="text-align: center;">Statut</th>
                        <th style="text-align: center;">Modifier</th>
                        <th style="text-align: center;">Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let invoice of invoices">
                        <td style="text-align: center;">{{ invoice.id }}</td>
                        <td style="text-align: center;">{{ invoice.amount }}</td>
                        <td style="text-align: center;">{{ invoice.status }}</td>
                        <td style="text-align: center;">
                            <input name="state" type="checkbox" role="switch" (change)="toggleSwitch(invoice.id, invoice.status)" [checked]="invoice.status === 'Payée'"/>
                        </td>
                        <td style="text-align: center;" (click)="onDeleteClick(invoice.id)">
                            <img src="https://www.juba-ouarab.fr/invoices/assets/delete.png" class="delete-icon" alt="Description de l'icône" />
                        </td>
                    </tr>
                </tbody>
            </table>           
        </details>

        <dialog [open]="openModal" (close)="onCancelClick()">
            <article>
                <h2>Êtes-vous sûr ?</h2>
                <p>Si vous supprimez cette facture, vous ne pouvez plus la récupérer.</p>
                <footer>
                    <button class="secondary" (click)="onCancelClick()">Annuler</button>
                    <button (click)="onConfirmClick()">Confirmer</button>
                </footer>
            </article>
        </dialog>
    `
})

export class InvoiceListComponent {

    @Input()
    invoices: Invoices = []

    @Input()
    nbOfInvoices: number = 0

    @Output()
    onUpdateInvoices = new EventEmitter<string>();

    openModal: boolean = false

    selectedInvoiceId: number = 0

    constructor(
        private invoiceApiService: InvoiceApiService,
        private router: Router
    ) { }


    /**
     * 
     * Supprimer une facture.
     * 
     * @param id de la facture.
     * 
     */
    onDeleteClick(id: any) {
        this.openModal = true
        this.selectedInvoiceId = id;
    }


    /**
     * Refuser la modal de suppression.
     */
    onCancelClick() {
        this.openModal = false
    }


    /**
     * Accepter la modal de suppression.
     */
    onConfirmClick() {
        this.invoiceApiService
        .remove(this.selectedInvoiceId)
        .subscribe(
            () => {
                this.openModal = false;
                this.onUpdateInvoices.emit()
            },
            error => {
                console.error('Error - DELETE invoice', error)
                this.router.navigate(["/error/message"])
            }
        )
    }


    /**
     * 
     * Changer le status d'une facture.
     * 
     * @param id de la facture.
     * @param status le nouveau status.
     * 
     */
    toggleSwitch(id: any, status: any) {
        

        if(id != undefined && (status === "Payée" || status === "Envoyée")){

            let newStatus: "Payée" | "Envoyée"

            if(status === "Payée")
                newStatus = "Envoyée"
            else
                newStatus = "Payée"

            this.invoiceApiService
            .updateStatus(id,newStatus)
            .subscribe(
                () => {
                    this.onUpdateInvoices.emit()
                },
                error => {
                    console.error('Error - DELETE invoice', error)
                    this.router.navigate(["/error/message"])
                }
            )
        }
    }

}