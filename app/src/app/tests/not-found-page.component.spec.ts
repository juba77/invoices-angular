import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from '../app.component';
import { NotFoundPageComponent } from '../pages/not-found-page.component';
import { CustomerListPageComponent } from '../pages/customer-list-page.component';
import { CustomerCreatePageComponent } from '../pages/customer-create-page.component';
import { InvoiceCreatePageComponent } from '../pages/invoice-create-page.component';
import { CustomerDetailPageComponent } from '../pages/customer-detail-page.component';
import { ErrorPageComponent } from '../pages/error-page.component';



/**
 * Routes configurées.
 */
const routes: Routes = [
    { path: '', component: CustomerListPageComponent },
    { path: 'create', component: CustomerCreatePageComponent },
    { path: ':id/invoices/add', component: InvoiceCreatePageComponent },
    { path: ':id', component: CustomerDetailPageComponent },
    { path: 'error/message', component: ErrorPageComponent },
    { path: '**', component: NotFoundPageComponent }
]



/**
 * Composant à tester.
 */
describe('NotFoundComponent', () => {

    let router: Router
    let location: Location
    let fixture: ComponentFixture<AppComponent>

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [AppComponent, NotFoundPageComponent]
        }).compileComponents()

    router = TestBed.inject(Router)
    location = TestBed.inject(Location)

    fixture = TestBed.createComponent(AppComponent)
    router.initialNavigation()

    })



    /**
     * Tester que quand on appelle une route inéxistante, on affiche bien la page d'élément non trouvé.
     */
    it('should show "Ressource introuvable" when typing "/toto/toto"', async () => {

        await router.navigate(['/toto/toto'])
        fixture.detectChanges()

        const article = fixture.nativeElement.querySelector('article')
        expect(article.textContent).toContain('Ressource introuvable')

    })



    /**
     * Tester que quand on appelle une route inéxistante, on affiche bien <app-not-found-page>.
     */
    it('should display NotFoundPageComponent when navigating to "/toto/toto"', async () => {

        await router.navigate(['/toto/toto'])
        fixture.detectChanges()

        const compiled = fixture.nativeElement
        expect(compiled.querySelector('app-not-found-page')).toBeTruthy()

    })

})
