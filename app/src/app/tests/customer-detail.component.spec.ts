import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CustomerDetailComponent } from '../components/customer-detail.component';
import { Customer } from '../types/customer';
import { CustomerApiService } from '../services/customer-api.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpResponse } from '@angular/common/http';



/**
 * Composant à tester.
 */
describe('CustomerDetailComponent', () => {

    let component: CustomerDetailComponent;
    let fixture: ComponentFixture<CustomerDetailComponent>;

    /**
     * Avant chaque méthode.
     */
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            declarations: [CustomerDetailComponent],
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            providers: [ CustomerApiService]
        }).compileComponents()

        fixture = TestBed.createComponent(CustomerDetailComponent)
        component = fixture.componentInstance

    })



    /**
     * Test de la bonne création du composant.
     */
    it('should create component', () => {
        expect(component).toBeTruthy()
    })



    /**
     * Tester qu'on affiche les bonne informations du client.
     */
    it('should display customer details', () => {

        // simuler un client
        const customer: Customer = { id: 1, fullName: 'Juba Ouarab', email: 'juba@gmail.com' }
        component.customer = customer
        fixture.detectChanges()

        // s'assurer que les infos sont bonnes
        const element: HTMLElement = fixture.nativeElement
        expect(element.textContent).toContain('Juba Ouarab')
        expect(element.textContent).toContain('juba@gmail.com')

    })



    /**
     * Tester que la modal s'ouvre bien en cliquant sur supprimer un client.
     */
    it('should open modal on delete click', () => {

        // simuler un client
        component.customer = { id: 1, fullName: 'Juba Ouarab', email: 'juba@gmail.com' }
        fixture.detectChanges()
        
        // s'assurer que la modal est bien fermée
        expect(component.openModal).toBeFalse()

        // cliquer sur supprimer
        const deleteButton: HTMLElement = fixture.nativeElement.querySelector('.delete')
        deleteButton.click()

        // s'assurer que la modal est bien ouverte
        expect(component.openModal).toBeTrue()

    })



    /**
     * Tester que la modal se ferme bien en cliquant sur cancel.
     */
    it('should close modal on cancel click', () => {

        // simuler un client
        component.customer = { id: 1, fullName: 'Juba Ouarab', email: 'juba@gmail.com' }
        fixture.detectChanges()
        
        // s'assurer que la modal est bien fermée
        expect(component.openModal).toBeFalse()

        // cliquer sur supprimer
        const deleteButton: HTMLElement = fixture.nativeElement.querySelector('.delete')
        deleteButton.click()

        // s'assurer que la modal est bien ouverte
        expect(component.openModal).toBeTrue()

        // cliquer sur cancel
        const cancelButton: HTMLButtonElement = fixture.nativeElement.querySelector('.secondary')
        cancelButton.click()

        // s'assurer que la modal est bien fermée
        expect(component.openModal).toBeFalse()
        
    })



    /**
     * Tester la bonne suppression d'un client quand on confirme.
     */
    it('should delete customer on confirm click', () => {

        // mocker remove
        const customerApiService = TestBed.inject(CustomerApiService)
        spyOn(customerApiService, 'remove').and.returnValue(of())
        
        // simuler un client
        component.customer = { id: 1, fullName: 'Juba Ouarab', email: 'juba@gmail.com' }
        fixture.detectChanges()

        // clicker sur supprimer
        const deleteButton: HTMLElement = fixture.nativeElement.querySelector('.delete')
        deleteButton.click()

        // cliquer sur confirmer
        const confirmButton: HTMLButtonElement = fixture.nativeElement.querySelector('.confirm')
        confirmButton.click()

        // s'assurer que la méthode qui supprime a été appelée
        expect(customerApiService.remove).toHaveBeenCalledWith(1)

    })



    /**
     * S'assurer qu'on se redirige bien à l'accueil quand l'api nous renvoie une réponse 200 après un remove.
     */
    it('should navigate to home after customer deletion with http reponse status 200', () => {

        // mocker router
        const router = TestBed.inject(Router)
        const routerSpy = spyOn(router, 'navigate')

        // mocker remove
        const customerApiService = TestBed.inject(CustomerApiService)
        const response = new HttpResponse({ status: 200 })
        spyOn(customerApiService, 'remove').and.returnValue(of(response))
        
        // simuler un client
        component.customer = { id: 1, fullName: 'Juba Ouarab', email: 'juba@gmail.com' }
        fixture.detectChanges()

        // clicker sur supprimer
        const deleteButton: HTMLElement = fixture.nativeElement.querySelector('.delete')
        deleteButton.click()

        // cliquer sur confirmer
        const confirmButton: HTMLButtonElement = fixture.nativeElement.querySelector('.confirm')
        confirmButton.click()

        // s'assurer que la méthode qui supprime a été appelée
        expect(customerApiService.remove).toHaveBeenCalledWith(1)

        // s'assurer qu'on se redirige à l'accueil
        expect(routerSpy).toHaveBeenCalledWith(['/'])

    })

})
