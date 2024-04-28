import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { of } from 'rxjs'

import { InvoiceListComponent } from '../components/invoice-list.component'
import { Invoices } from '../types/invoice'
import { InvoiceApiService } from '../services/invoice-api.service'



/**
 * Composant à tester.
 */
describe('InvoiceListComponent', () => {



    /**
     * Initialisations des variables.
     */
    let component: InvoiceListComponent
    let fixture: ComponentFixture<InvoiceListComponent>
    let invoices: Invoices



    /**
     * Avant chaque méthode.
     */
    beforeEach(async () => {

        // préparer le composant
        await TestBed.configureTestingModule({

            declarations: [ InvoiceListComponent ],
            providers: [ InvoiceApiService ],
            imports: [ 
                RouterModule.forRoot([]),
                HttpClientModule
             ]

        })
        .compileComponents();
        fixture = TestBed.createComponent(InvoiceListComponent)
        component = fixture.componentInstance

        // simuler une liste de factures
        invoices = [
            { id: 1, amount: '2500', status: 'Envoyée', customer: 1},
            { id: 2, amount: '2500', status: 'Envoyée', customer: 1},
            { id: 3, amount: '2500', status: 'Envoyée', customer: 1}
        ]
        component.invoices = invoices
        component.nbOfInvoices = invoices.length

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
     * Test du bon nombre de factures récupérés.
     */
    it('should display the correct number of invoices', () => {

        // s'assurer qu'on affiche le bon nombre de factures
        const summaryElement = fixture.debugElement.query(By.css('summary'))
        expect(summaryElement.nativeElement.textContent).toContain(`Voir les factures (${invoices.length})`)

        // s'assurer que le tableau a la bonne taille
        const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'))
        expect(tableRows.length).toBe(invoices.length)

    })



    /**
    * Tester que pour chaque facture récupérée, on affiche les bonnes informations.
    */
    it('should display the correct invoice data', () => {

        // s'assurer que le tableau a la bonne taille
        const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
        expect(tableRows.length).toBe(invoices.length);
    
        // s'assurer que pour chaque facture récupérée, on affiche le bon montant et status
        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i]
            const cells = row.queryAll(By.css('td'))
            const invoice = invoices[i]
            expect(cells[1].nativeElement.textContent).toContain(invoice.amount.toString())
            expect(cells[2].nativeElement.textContent).toContain(invoice.status.toString())
        }

    })



    /**
    * Tester que le boutton "Voir les factures" se désactive bien quand la liste des factures est vide.
    */
    it('should disable the "Voir les factures" button if invoices array is empty', () => {

        // simuler qu'il existe aucune facture
        component.invoices = []
        component.nbOfInvoices = 0

        // trigger le changement
        fixture.detectChanges()
    
        // récupérer le boutton "Voir les factures"
        const button = fixture.debugElement.query(By.css('summary')).nativeElement
    
        // vérifier que le boutton est bien disabled
        expect(button.hasAttribute('disabled')).toBeTrue()
        
    })



    /**
     * Tester que quand on clique sur supprimer une facture, la modal s'ouvre bien pour confirmer le choix.
     */
    it('should open a modal when delete button is clicked', () => {
    
        // trouver l'élément de la modal
        const modalElement = fixture.debugElement.query(By.css('dialog'))

        // vérifier que la variable openModal qui controle l'état de la dialog est bien false avant de cliquer
        expect(component.openModal).toBeFalse()

        // vérifier que l'attribut 'open' n'est pas présent sur l'élément de la modal avant de cliquer
        expect(modalElement.nativeElement.hasAttribute('open')).toBeFalse()
    
        // appeler la méthode onDeleteClick avec l'id de facture choisie
        component.onDeleteClick(1)

        // trigger le changement
        fixture.detectChanges()
    
        // vérifier que la variable openModal qui controle l'état de la dialog est bien true
        expect(component.openModal).toBeTrue()

        // vérifier que l'attribut 'open' est présent sur l'élément de la modal
        expect(modalElement.nativeElement.hasAttribute('open')).toBeTrue()

        // vérifier le contenu de la modal
        expect(modalElement.nativeElement.textContent).toContain('Êtes-vous sûr ?')

    })
    
    
    
    /**
     * Tester la bonne suppression de facture.
     */
    it('should delete an invoice when delete button is clicked and modal confirmed', () => {

        // espionner la méthode onConfirmClick
        const invoiceApiService = TestBed.inject(InvoiceApiService)
        const onConfirmSpy = spyOn(invoiceApiService, 'remove')
    
        // moocker le retour de remove
        onConfirmSpy.and.returnValue(of([
            { id: 2, amount: '2500', status: 'Envoyée', customer: 1},
            { id: 3, amount: '2500', status: 'Envoyée', customer: 1}
        ]))

        // mettre à jour le composant
        fixture.detectChanges()
    
        // vérifier que la variable openModal qui contrôle l'état de la dialog est bien false avant de le simuler
        expect(component.openModal).toBeFalse()
    
        // simuler que le modal est ouvert
        component.openModal = true
    
        // vérifier que la variable openModal est devenue vraie
        expect(component.openModal).toBeTrue()
    
        // simuler que la facture à supprimer est la 1
        component.selectedInvoiceId = 1
    
        // appeler la méthode onConfirmClick pour confirmer la suppression 
        component.onConfirmClick()
    
        // s'assurer que la méthode qui supprime la facture 1 est bien appelée
        expect(onConfirmSpy).toHaveBeenCalled()
    
    })
    
})