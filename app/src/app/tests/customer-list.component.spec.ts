import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { CustomerListComponent } from '../components/customer-list.component'
import { Customers } from '../types/customer'



/**
 * Composant à tester.
 */
describe('CustomerListComponent', () => {



    /**
     * Initialisations des variables.
     */
    let component: CustomerListComponent
    let fixture: ComponentFixture<CustomerListComponent>
    let customers: Customers



    /**
     * Avant chaque méthode.
     */
    beforeEach(async () => {

        // préparer le composant
        await TestBed.configureTestingModule({

            declarations: [ CustomerListComponent ],
            imports: [RouterModule.forRoot([])]

        })
        .compileComponents();
        fixture = TestBed.createComponent(CustomerListComponent)
        component = fixture.componentInstance

        // définir une liste de clients
        customers = [
            { id: 1, fullName: 'Juba Un', email: 'un.juba@gmail.com' },
            { id: 2, fullName: 'Juba Deux', email: 'deux.juba@gmail.com' }
        ]
        component.customers = customers
        component.nbOfCustomers = customers.length

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
     * Test du bon fonctionnement de la fonction de recherche des clients par nom complet.
     */
    it('should emit onSearch event when searchInputChange is called', () => {

        // spy sur l'événement onSearch
        const emitSpy = spyOn(component.onSearch, 'emit')
        
        // simuler une entrée de l'utilisateur lettre par lettre
        const inputText = 'tot'
        let currentInput = ''
        for (let i = 0; i < inputText.length; i++) {

            currentInput += inputText.charAt(i)
            
            // créer un objet d'événement simulé avec une propriété target contenant la valeur de la lettre actuelle
            const inputEvent = {
                target: {
                    value: currentInput
                }
            } as unknown as Event

            // appeler la méthode searchInputChange avec l'objet d'événement simulé
            component.searchInputChange(inputEvent)

            // vérifier que la méthode emit a été appelée avec la valeur de la lettre actuelle
            expect(emitSpy).toHaveBeenCalledWith(currentInput)

        }
    })



    /**
     * Test du bon nombre des clients récupérés.
     */
    it('should display the correct number of customers', () => {

        // s'assurer qu'on affiche le bon nombre des clients
        const summaryElement = fixture.debugElement.query(By.css('summary'))
        expect(summaryElement.nativeElement.textContent).toContain(`Voir les clients (${customers.length})`)

        // s'assurer que le tableau a la bonne taille
        const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'))
        expect(tableRows.length).toBe(customers.length)

    })



    /**
     * Tester que pour chaque client récupéré, on affiche les bonnes informations.
     */
    it('should display the correct customer data', () => {

        // s'assurer que le tableau a la bonne taille
        const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'))
        expect(tableRows.length).toBe(customers.length)

        // s'assurer que pour chaque client récupéré, on affiche le bon nom et email
        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i]
            expect(row.nativeElement.textContent).toContain(customers[i].fullName)
            expect(row.nativeElement.textContent).toContain(customers[i].email)
        }

    })



    /**
     * Tester que le boutton "Voir les clients" se désactive bien quand la liste des clients est vide.
     */
    it('should disable the "Voir les clients" button if customers array is empty', () => {

        // simuler qu'il existe aucun client
        component.customers = []
        component.nbOfCustomers = 0

        // trigger le changement
        fixture.detectChanges()
    
        // récupérer le boutton "Voir les clients"
        const button = fixture.debugElement.query(By.css('summary')).nativeElement
    
        // vérifier que le boutton est bien disabled
        expect(button.hasAttribute('disabled')).toBeTrue()
        
      })
    

  
})