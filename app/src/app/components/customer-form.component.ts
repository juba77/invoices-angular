import { Component, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Customer } from "../types/customer";

@Component({
    selector: "app-customer-form",
    template: `
        <form (ngSubmit)="onSubmit()" [formGroup]="form" class="container">
            <fieldset>
                <label>
                    <input 
                        formControlName="fullNameControl"
                        type="text" 
                        name="fullName" 
                        placeholder="Prénom NOM"
                        [attr.aria-invalid]="!isTouchedFullName ? null : (!isValidFullName ? 'true' : 'false')"
                    />
                    <small *ngIf="!isValidFullName && isTouchedFullName" id="invalid-helper">Entrez un nom complet valide !</small>
                    <small *ngIf="isValidFullName" id="valid-helper">Nom complet accepté !</small>
                </label>
                <label>
                    <input 
                        formControlName="emailControl"
                        type="email" 
                        name="email" 
                        placeholder="example@email.com"
                        [attr.aria-invalid]="!isTouchedEmail ? null : (!isValidEmail ? 'true' : 'false')"
                    />
                    <small *ngIf="!isValidEmail && isTouchedEmail" id="invalid-helper">Entrez un email valide !</small>
                    <small *ngIf="isValidEmail" id="valid-helper">Email accepté !</small>
                </label>
            </fieldset>
            <button type="submit"[disabled]="!isValidFullName || !isValidEmail" >Enregistrer</button>
        </form>
    `
})

/**
 * Composant formulaire pour la création de nouveaux clients.
 * Ce formulaire comprend des champs pour le nom complet et l'adresse e-mail du client.
 * Les champs sont soumis à des validations pour garantir la saisie correcte des données.
 */
export class CustomerFormComponent {


    /**
     * Varaibles de validations pour le fullName et l'email.
     */
    @Output()
    isValidFullName = false
    isValidEmail = false
    isTouchedFullName: boolean = false;
    isTouchedEmail: boolean = false;


    /** 
     * Événement émis lorsqu'un nouveau client est créé. 
     */
    @Output()
    onNewCustomer = new EventEmitter<Customer>();

    
    /**
     * Formulaire pour la création de nouveaux clients.
     */
    form = new FormGroup({

        /** Champ pour le nom complet du client. */
        fullNameControl: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern('[a-zA-ZÀ-ú. -]*')
        ]),

        /** Champ pour l'adresse e-mail du client. */
        emailControl: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-ZÀ-ú0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
        ])
    });



    /**
     * Constructeur.
     */
    constructor() {
        this.watchFullNameChanges();
        this.watchEmailChanges();
    }


    /**
     * Méthode appelée lors de la soumission du formulaire.
     * Émet un événement avec les données du nouveau client si le formulaire est valide.
     * Réinitialise le formulaire après l'émission de l'événement.
     */
    onSubmit() {

        const fullName = this.form.value.fullNameControl
        const email = this.form.value.emailControl

        if (this.form.valid && fullName !== undefined && fullName !== null && email !== undefined && email !== null) { 
            const newCustomer: Customer = {
                fullName: fullName,
                email: email
            }
    
            this.onNewCustomer.emit(newCustomer)
    
            this.form.setValue({
                fullNameControl: '',
                emailControl: '',
            })
        }

    }


    /**
     * Méthode qui surveille les changements dans le champ du nom complet.
     * Met à jour la variable isValidFullName et marque le champ comme touché une fois que l'utilisateur a interagi avec lui.
     */
    watchFullNameChanges() {
        this.form.get('fullNameControl')?.valueChanges.subscribe(value => {
            this.isValidFullName = this.form.controls.fullNameControl.valid
            console.log('isValidFullName : ',this.isValidFullName)
            if (!this.isTouchedFullName) {
                console.log('isTouchedFullName')
                this.isTouchedFullName = true
            }
            this.onFormStateChange.emit(this.borderFormState())
        });
    }


    /**
     * Méthode qui surveille les changements dans le champ de l'adresse e-mail.
     * Met à jour la variable isValidEmail et marque le champ comme touché une fois que l'utilisateur a interagi avec lui.
     */ 
    watchEmailChanges() {
        this.form.get('emailControl')?.valueChanges.subscribe(value => {
            this.isValidEmail = this.form.controls.emailControl.valid
            console.log('isValidEmail : ',this.isValidEmail)
            if (!this.isTouchedEmail) {
                console.log('isTouchedEmail')
                this.isTouchedEmail = true
            }
            this.onFormStateChange.emit(this.borderFormState())
        });
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
        if(this.isValidEmail && this.isValidFullName)
            return "border-green";
        else if((!this.isValidEmail && this.isTouchedEmail) || (!this.isValidFullName && this.isTouchedFullName))
            return "border-red";
        else 
            return "border-purple";
    }

}