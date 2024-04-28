import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

import { CustomerFormComponent } from '../components/customer-form.component'



/**
 * Composant à tester.
 */
describe('CustomerFormComponent', () => {



    /**
     * Initialisations des variables.
     */
    let component: CustomerFormComponent;
    let fixture: ComponentFixture<CustomerFormComponent>;



    /**
     * Avant chaque méthode.
     */
    beforeEach(async () => {

        // préparer le composant
        await TestBed.configureTestingModule({
            declarations: [CustomerFormComponent],
            imports: [ReactiveFormsModule]
        }).compileComponents()
        fixture = TestBed.createComponent(CustomerFormComponent)
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
        expect(component.form.get('fullNameControl')?.value).toEqual('')
        expect(component.form.get('emailControl')?.value).toEqual('')
    })


    
    /**
     * Tester que dès qu'on rentre une lettre dans le champ "fullName", il est considéré comme "touché".
     */
    it('should mark fullName as touched after user interaction', () => {

        // s'assurer qu'au début l'email n'est pas touché par l'utilisateur
        expect(component.isTouchedEmail).toBeFalse()

        // s'assurer qu'au début le fullName n'est pas touché par l'utilisateur
        expect(component.isTouchedFullName).toBeFalse()

        // simuler que l'utilisateur a commencé à remplir le nom
        const fullNameInput = fixture.debugElement.query(By.css('input[name="fullName"]')).nativeElement
        fullNameInput.value = 'J'
        fullNameInput.dispatchEvent(new Event('input'))

        // appliquer les changements
        fixture.detectChanges()

        // s'assurer que le fullName est bien touché par l'utilisateur
        expect(component.isTouchedFullName).toBeTrue()

        // s'assurer que l'email n'est pas touché par l'utilisateur
        expect(component.isTouchedEmail).toBeFalse()

    })



    /**
     * Tester que dès qu'on rentre une lettre dans le champ "email", il est considéré comme "touché".
     */
    it('should mark email as touched after user interaction', () => {

        // s'assurer qu'au début l'email n'est pas touché par l'utilisateur
        expect(component.isTouchedEmail).toBeFalse()

        // s'assurer qu'au début le fullName n'est pas touché par l'utilisateur
        expect(component.isTouchedFullName).toBeFalse()

        // simuler que l'utilisateur a commencé à remplir l'email
        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement
        emailInput.value = 'j'
        emailInput.dispatchEvent(new Event('input'))

        // appliquer les changements
        fixture.detectChanges()

        // s'assurer que le email est bien touché par l'utilisateur
        expect(component.isTouchedEmail).toBeTrue()

        // s'assurer que le fullName n'est pas touché par l'utilisateur
        expect(component.isTouchedFullName).toBeFalse()
        
    })



    /**
     * S'assurer qu'un nom complet ne peut pas contenir des chiffres.
     */
    it('should not accept fullName input when it contains numbers', () => {

        const fullNameInput = fixture.debugElement.query(By.css('input[name="fullName"]')).nativeElement
        fullNameInput.value = 'Juba777777'
        fullNameInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const fullNameValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(fullNameValidationMessage.textContent).toContain('Entrez un nom complet valide !')

    })



    /**
     * S'assurer qu'un nom complet ne peut pas avoir une longueur inférieure à 3.
     */
    it('should not accept fullName input when his lengeth is less than 3', () => {

        const fullNameInput = fixture.debugElement.query(By.css('input[name="fullName"]')).nativeElement
        fullNameInput.value = 'ju'
        fullNameInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const fullNameValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(fullNameValidationMessage.textContent).toContain('Entrez un nom complet valide !')

    })



    /**
     * S'assurer qu'un nom complet ne peut pas avoir une longueur supérieure à 50.
     */
    it('should not accept fullName input when his lengeth is more than 50', () => {

        const fullNameInput = fixture.debugElement.query(By.css('input[name="fullName"]')).nativeElement
        fullNameInput.value = 'azertazertazertazertazertazertazertazertazertazertx' // 51
        fullNameInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const fullNameValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(fullNameValidationMessage.textContent).toContain('Entrez un nom complet valide !')

    })



    /**
     * S'assurer qu'un nom complet ne peut pas contenir des caractères spéciaux.
     */
    it('should not accept fullName input when it contains special chars', () => {

        const fullNameInput = fixture.debugElement.query(By.css('input[name="fullName"]')).nativeElement
        fullNameInput.value = 'juba*' 
        fullNameInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const fullNameValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(fullNameValidationMessage.textContent).toContain('Entrez un nom complet valide !')

    })



    /**
     * S'assurer qu'un email doit contenir un @.
     */
    it('should not accept email input when it not contains @', () => {

        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        emailInput.value = 'ceciestunemailbidon.fr'
        emailInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const emailValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(emailValidationMessage.textContent).toContain('Entrez un email valide !')

    })



    /**
     * S'assurer qu'un email doit contenir un point.
     */
    it('should not accept email input when it not contains a point', () => {

        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        emailInput.value = 'ceciestunemail@bidonfr'
        emailInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const emailValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(emailValidationMessage.textContent).toContain('Entrez un email valide !')

    })
    
    

    /**
     * S'assurer que le format d'un email doit être respecté.
     */
    it('should not accept email input when it not respects a email format - 1', () => {

        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        emailInput.value = '@bidon.fr'
        emailInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const emailValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(emailValidationMessage.textContent).toContain('Entrez un email valide !')

    })



    /**
     * S'assurer que le format d'un email doit être respecté.
     */
    it('should not accept email input when it not respects a email format - 2', () => {

        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        emailInput.value = 'ceci@.fr'
        emailInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const emailValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(emailValidationMessage.textContent).toContain('Entrez un email valide !')

    })



    /**
     * S'assurer que le format d'un email doit être respecté.
     */
    it('should not accept email input when it not respects a email format - 3', () => {

        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        emailInput.value = 'ceci@email.'
        emailInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const emailValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(emailValidationMessage.textContent).toContain('Entrez un email valide !')

    })



    /**
     * S'assurer que le format d'un email doit être respecté.
     */
    it('should not accept email input when it not respects a email format - 4', () => {

        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        emailInput.value = 'ceci@email.a'
        emailInput.dispatchEvent(new Event('input'))
        fixture.detectChanges()

        const emailValidationMessage = fixture.debugElement.query(By.css('#invalid-helper')).nativeElement
        expect(emailValidationMessage.textContent).toContain('Entrez un email valide !')

    })


    /**
     * S'assurer que tant qu'on a pas saisi les bonnes entrées, le bouttin de soumission est désactivé.
     */
    it('should disable the "Enregistrer" button if both fields are invalid', () => {
        
        // s'assurer qu'au début les deux champs sont invalides
        expect(component.isValidFullName).toBeFalse()
        expect(component.isValidEmail).toBeFalse()
    
        // récupérer le boutton qui nous intéresse
        const saveButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement
    
        // s'assurer qu'au début il est désactivé
        expect(saveButton.disabled).toBeTrue()
    
        // simuler que l'utilisateur a saisi un nom complet valide
        const fullNameInput = fixture.debugElement.query(By.css('input[name="fullName"]')).nativeElement
        fullNameInput.value = 'Juba TOto'
        fullNameInput.dispatchEvent(new Event('input'))
    
        // appliquer les changements
        fixture.detectChanges()
    
        // s'assure que le boutton est toujours désactivé
        expect(saveButton.disabled).toBeTrue()
    
        // simuler que l'utilisateur a saisi un email valide
        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement
        emailInput.value = 'juba@gmail.com'
        emailInput.dispatchEvent(new Event('input'))
    
        // appliquer les changements
        fixture.detectChanges()
    
        // le boutton est maitenant actif car les deux entrées sont valides
        expect(saveButton.disabled).toBeFalse()

    })


    
    /**
     * S'assurer que (enfin) quand le fullName et le email sont valides, alors créer un client.
     */
    it('should emit new customer when form is submitted with valid fullName and email', () => {

        // entrer un nom complet valide
        const fullNameInput = fixture.debugElement.query(By.css('input[name="fullName"]')).nativeElement
        fullNameInput.value = 'John Doe'
        fullNameInput.dispatchEvent(new Event('input'))

        // applqiuer les changements
        fixture.detectChanges()

        // entrer un nemail valide
        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement
        emailInput.value = 'john@example.com'
        emailInput.dispatchEvent(new Event('input'))

        // applqiuer les changements
        fixture.detectChanges()

        // mocker onNewCustomer
        spyOn(component.onNewCustomer, 'emit')
        const form = fixture.debugElement.query(By.css('form')).nativeElement
        form.dispatchEvent(new Event('submit'))
        fixture.detectChanges()

        // s'assurer que la méthode onNewCustomer qui crée un nouveau Client est appelée
        expect(component.onNewCustomer.emit).toHaveBeenCalled()

    })



    /**
     * S'assurer que les champs du formulaire se remettent à vide après sa soumission.
     */
    it('should reset form after successful submission', () => {
        const fullNameInput = fixture.debugElement.query(By.css('input[name="fullName"]')).nativeElement;
        fullNameInput.value = 'John Doe';
        fullNameInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        emailInput.value = 'john@example.com';
        emailInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const form = fixture.debugElement.query(By.css('form')).nativeElement;
        form.dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        expect(component.form.get('fullNameControl')?.value).toEqual('');
        expect(component.form.get('emailControl')?.value).toEqual('');
    })


})
