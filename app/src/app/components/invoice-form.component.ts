import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Invoice } from "../types/invoice";

@Component({
    selector: "app-invoice-form",
    template: `
        <form (ngSubmit)="onSubmit()" [formGroup]="form" class="container">
            <fieldset>
                <label>
                    <input 
                        formControlName="amountControl"
                        type="number" 
                        name="amount" 
                        placeholder="1500" 
                        aria-label="Number"
                        [attr.aria-invalid]="!isTouchedAmount ? null : (!isValidAmount ? 'true' : 'false')"
                    />
                    <small *ngIf="!isValidAmount && isTouchedAmount" id="invalid-helper">Entrez un montant valide !</small>
                    <small *ngIf="isValidAmount" id="valid-helper">Montant acceptée !</small>
                </label>
                <label>
                    <select 
                        formControlName="statusControl" 
                        name="status"
                        [attr.aria-invalid]="isValidStatus ? 'false' : 'null'"
                    >
                        <option value="PAID">Payée</option>
                        <option value="SENT">Envoyée</option>
                    </select>
                    <small *ngIf="isValidStatus" id="valid-helper">Status accepté !</small>
                </label>
            </fieldset>
            <button 
                [disabled]="!isValidAmount || !isValidStatus" 
                type="submit">
                Enregistrer la facture
            </button>
        </form>
    `
})


/**
 * Composant formulaire pour la création de nouvelles factures.
 * Ce formulaire comprend des champs pour le montant et le status de la facture.
 * Les champs sont soumis à des validations pour garantir la saisie correcte des données.
 */
export class InvoiceFormComponent {


    /**
     * Varaibles de validations pour le Amount et le status.
     */
    isValidAmount = false
    isTouchedAmount: boolean = false
    isValidStatus = false


    /**
     * L'id du client reçu par le parent.
     */
    @Input()
    customer: number = 0


    /** 
     * Événement émis lorsqu'une nouvelle facture est créée. 
     */
    @Output()
    onNewInvoice = new EventEmitter<Invoice>();


    /**
     * Formulaire pour la création de nouvelles factures.
     */
    form = new FormGroup({

        /** Champ pour le montant de la facture. */
        amountControl: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(999999),
            Validators.pattern("^[1-9][0-9]*$")
        ]),

        /** Champ pour le status de la facture. */
        statusControl: new FormControl('', [
            Validators.required,
            Validators.pattern("^(PAID|SENT)$")
        ]),
    });


    /**
     * Constructeur.
     */
    constructor(){
        this.watchAmountChanges()
        this.watchStatusChanges()
    }


    /**
     * Méthode appelée lors de la soumission du formulaire.
     * Émet un événement avec les données de la nouvelle facture si le formulaire est valide.
     * Réinitialise le formulaire après l'émission de l'événement.
     */
    onSubmit() {

        const amount = this.form.value.amountControl
        const status = this.form.value.statusControl

        if(this.form.valid && amount !== undefined && amount !== null && status !== undefined && status !== null){

            let statusInFrench: "Payée" | "Envoyée" = "Envoyée"

            if(status!= "SENT")
                statusInFrench = "Payée"

            const newInvoice: Invoice = {
                amount: amount,
                status: statusInFrench,
                customer: this.customer
            };

            this.onNewInvoice.emit(newInvoice); 

            this.form.setValue({
                amountControl: '',
                statusControl: '',
            })
        }
    }


    /**
     * Méthode qui surveille les changements dans le champ montant.
     * Met à jour la variable isValidAmount et marque le champ comme touché une fois que l'utilisateur a interagi avec lui.
     */
    watchAmountChanges() {
        this.form.get('amountControl')?.valueChanges.subscribe(value => {
            this.isValidAmount = this.form.controls.amountControl.valid
            console.log('isValidAmount : ',this.isValidAmount)
            if (!this.isTouchedAmount) {
                console.log('isTouchedAmount')
                this.isTouchedAmount = true
            }
            this.onFormStateChange.emit(this.borderFormState())
        })
    }


    /**
     * Méthode qui surveille les changements dans le champ status.
     * Met à jour la variable isValidStatus.
     */
    watchStatusChanges() {
        this.form.get('statusControl')?.valueChanges.subscribe(value => {
            this.isValidStatus = this.form.controls.statusControl.valid
            console.log('isValidStatus : ',this.isValidStatus)
            this.onFormStateChange.emit(this.borderFormState())
        })
    }


    /**
     * Événement émis lorsque la couleur des bords du formulaire doit changer.
     */
    @Output()
    onFormStateChange = new EventEmitter<string>();



    /**
     * 
     * Trouver la couleur des bords du formulaire du parent.
     * 
     * @returns la nouvelle couleur à changer.
     * 
     */
    borderFormState(): string{
        if(this.isValidAmount && this.isValidStatus)
            return "border-green";
        else if((!this.isValidAmount && this.isTouchedAmount))
            return "border-red";
        else 
            return "border-purple";
    }
    
}