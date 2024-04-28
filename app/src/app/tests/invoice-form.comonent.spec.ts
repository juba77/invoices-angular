import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

import { InvoiceFormComponent } from '../components/invoice-form.component'



/**
 * Composant à tester.
 */
describe('InvoiceFormComponent', () => {



    /**
     * Initialisations des variables.
     */
    let component: InvoiceFormComponent;
    let fixture: ComponentFixture<InvoiceFormComponent>;



    /**
     * Avant chaque méthode.
     */
    beforeEach(async () => {

        // préparer le composant
        await TestBed.configureTestingModule({
            declarations: [InvoiceFormComponent],
            imports: [ReactiveFormsModule]
        }).compileComponents()
        fixture = TestBed.createComponent(InvoiceFormComponent)
        component = fixture.componentInstance

        // appliquer les changements
        fixture.detectChanges()
    })



    /**
     * Test de la bonne création du composant.
     */
    it('should create the component', () => {
        expect(component).toBeTruthy()
    })




    /**
     * Tester la bonne initialisation des valeurs des deux inputs à vide au lancement du composant.
     */
    it('should initialize form controls with empty values', () => {
        expect(component.form.get('amountControl')?.value).toEqual('')
        expect(component.form.get('statusControl')?.value).toEqual('')
    })


    
    /**
     * Tester que dès qu'on rentre une lettre dans le champ "amount", il est considéré comme "touché".
     */
    it('should mark amount as touched after user interaction', () => {

        // s'assurer qu'au début le montant n'est pas touché par l'utilisateur
        expect(component.isTouchedAmount).toBeFalse()

        // simuler que l'utilisateur a commencé à remplir le le montant
        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '1'
        amountInput.dispatchEvent(new Event('input'))

        // appliquer les changements
        fixture.detectChanges()

        // s'assurer que le montant est bien touché par l'utilisateur
        expect(component.isTouchedAmount).toBeTrue()

    })


    /**
     * S'assurer qu'un montant ne peut pas contenir des lettres.
     */
    it('should not accept amount input when it contains alphabetic letters', () => {

        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '1500a'
        amountInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const amountValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(amountValidationMessage.textContent).toContain('Entrez un montant valide !')

    })



    /**
     * S'assurer qu'un montant ne peut pas être 0.
     */
    it('should not accept amount input when is equal to 0', () => {

        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '0'
        amountInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const amountValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(amountValidationMessage.textContent).toContain('Entrez un montant valide !')

    })



    /**
     * S'assurer qu'un montant ne peut pas être négatif.
     */
    it('should not accept amount input when is negative', () => {

        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '-1500'
        amountInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const amountValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(amountValidationMessage.textContent).toContain('Entrez un montant valide !')

    })



    /**
     * S'assurer qu'un montant ne peut pas dépasser 999999.
     */
    it('should not accept amount input when is bigger than 999999', () => {

        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '1000000'
        amountInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const amountValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(amountValidationMessage.textContent).toContain('Entrez un montant valide !')

    })



    /**
     * S'assurer qu'un montant ne peut pas contenir des caractères spéciaux.
     */
    it('should not accept amount input when it contains special chars', () => {

        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '1500*'
        amountInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const amountValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(amountValidationMessage.textContent).toContain('Entrez un montant valide !')

    })

// TODO : rename inputStatus by selectStatus && correct the english descriptions

    /**
     * S'assurer que le status ne peut être que "PAID" ou "SENT".
     */
    it('should not accept status input when is different from PAID and SENT', () => {

        const statusSelect = fixture.debugElement.query(By.css('select[name="status"]')).nativeElement;
        statusSelect.value = 'OTHER'
        statusSelect.dispatchEvent(new Event('change'))
        fixture.detectChanges()

        expect(component.isValidStatus).toBeFalse

    })



    /**
     * S'assurer que tant qu'on a pas saisi les bonnes entrées, le bouttin de soumission est désactivé.
     */
    it('should disable the "Enregistrer la facture" button if both fields are invalid', () => {
        
        // s'assurer qu'au début les deux champs sont invalides
        expect(component.isValidAmount).toBeFalse()
        expect(component.isValidStatus).toBeFalse()
    
        // récupérer le boutton qui nous intéresse
        const saveButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement
    
        // s'assurer qu'au début il est désactivé
        expect(saveButton.disabled).toBeTrue()
    
        // simuler que l'utilisateur a saisi un montant valide
        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '1500'
        amountInput.dispatchEvent(new Event('input'))
    
        // appliquer les changements
        fixture.detectChanges()
    
        // s'assure que le boutton est toujours désactivé
        expect(saveButton.disabled).toBeTrue()
    
        // simuler que l'utilisateur a selectionné un status valide
        const statusSelect = fixture.debugElement.query(By.css('select[name="status"]')).nativeElement
        statusSelect.value = 'PAID'
        statusSelect.dispatchEvent(new Event('change'))
    
        // appliquer les changements
        fixture.detectChanges()
    
        // le boutton est maitenant actif car les deux entrées sont valides
        expect(saveButton.disabled).toBeFalse()

    })


    
    /**
     * S'assurer que (enfin) quand le montant et le status sont valides, alors créer une facture.
     */
    it('should emit new invoice when form is submitted with valid amount and status', () => {

        // entrer un montant valide
        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '1250'
        amountInput.dispatchEvent(new Event('input'))

        // applqiuer les changements
        fixture.detectChanges()

        // entrer un status valide
        const statusSelect = fixture.debugElement.query(By.css('select[name="status"]')).nativeElement
        statusSelect.value = 'SENT'
        statusSelect.dispatchEvent(new Event('change'))

        // applqiuer les changements
        fixture.detectChanges()

        // mocker onNewInvoice
        spyOn(component.onNewInvoice, 'emit')
        const form = fixture.debugElement.query(By.css('form')).nativeElement
        form.dispatchEvent(new Event('submit'))
        fixture.detectChanges()

        // s'assurer que la méthode onNewCustomer qui crée un nouveau Client est appelée
        expect(component.onNewInvoice.emit).toHaveBeenCalled()

    })



    /**
     * S'assurer que les champs du formulaire se remettent à vide après sa soumission.
     */
    it('should reset form after successful submission', () => {

        // entrer un montant valide
        const amountInput = fixture.debugElement.query(By.css('input[name="amount"]')).nativeElement
        amountInput.value = '1250'
        amountInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        // entrer un status valide
        const statusSelect = fixture.debugElement.query(By.css('select[name="status"]')).nativeElement
        statusSelect.value = 'SENT'
        statusSelect.dispatchEvent(new Event('change'))
        fixture.detectChanges()

        // soumettre le formulaire
        const form = fixture.debugElement.query(By.css('form')).nativeElement;
        form.dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        // s'assurer que les deux champs sont bien vides
        expect(component.form.get('amountControl')?.value).toEqual('');
        expect(component.form.get('statusControl')?.value).toEqual('');
    })


})
