import { Component } from "@angular/core";

@Component({
    selector: 'app-not-found-page',
    template: `

        <nav class="conatiner margin-30">
            <ul>
                <li>
                    <a routerLink="/"><img src="https://www.juba-ouarab.fr/invoices/assets/logo.png" class="logo" alt="logo"></a>
                </li>
            </ul>
            <ul>
                <li><a routerLink="/">Retour à l'accueil</a></li>
            </ul>
        </nav>

        <article class="margin-30 border-purple">

            <header>
                <div class="container container-centred">
                    <h2 class="centred">Une erreur est survenue</h2>
                </div>
            </header>

            <section>
                <div class="container">
                    <p class="container container-centred">Vueillez vérifier votre demande et ressayer</p>
                </div>
            </section>

        </article>

    `
})


/**
 * Afficher ce composant quand une réponse d'erreur API est obtenue.
 */
export class ErrorPageComponent { }