import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

import { CustomerDetailComponent } from '../components/customer-detail.component';
import { CustomerApiService } from '../services/customer-api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



/**
 * Composant à tester.
 */
describe('ErrorComponent', () => {

    let customerDetailComponent: CustomerDetailComponent
    let fixtureCustomerDetailComponent: ComponentFixture<CustomerDetailComponent>

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

        fixtureCustomerDetailComponent = TestBed.createComponent(CustomerDetailComponent)
        customerDetailComponent = fixtureCustomerDetailComponent.componentInstance

    })



    /**
     * Test de la bonne création du composant.
     */
    it('should create component', () => {
        expect(customerDetailComponent).toBeTruthy()
    })



    /**
     * S'assurer qu'on se redirige bien à la page d'erreur quand l'api nous renvoie une réponse d'erreur.
     */
    it('should navigate to error page after http error reponse', () => {

        // mocker router
        const router = TestBed.inject(Router)
        const routerSpy = spyOn(router, 'navigate')

        // mocker remove
        const customerApiService = TestBed.inject(CustomerApiService)
        const error = new Error('Error removing customer')
        spyOn(customerApiService, 'remove').and.returnValue(throwError(error))
        
        // simuler un client
        customerDetailComponent.customer = { id: 1, fullName: 'Juba Ouarab', email: 'juba@gmail.com' }
        fixtureCustomerDetailComponent.detectChanges()

        // clicker sur supprimer
        const deleteButton: HTMLElement = fixtureCustomerDetailComponent.nativeElement.querySelector('.delete')
        deleteButton.click()

        // cliquer sur confirmer
        const confirmButton: HTMLButtonElement = fixtureCustomerDetailComponent.nativeElement.querySelector('.confirm')
        confirmButton.click()

        // s'assurer que la méthode qui supprime a été appelée
        expect(customerApiService.remove).toHaveBeenCalledWith(1)

        // s'assurer qu'on se redirige à la page d'erreur
        expect(routerSpy).toHaveBeenCalledWith(['/error/message'])

    })

})
