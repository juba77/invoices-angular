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
                    <h2 class="centred">Ressource introuvable</h2>
                </div>
            </header>

            <section>
                <div class="container">
                    <p class="container container-centred">La page que vous recherhcez n'existe pas</p>
                    <p class="container container-centred">Erreur 404</p>
                </div>
            </section>

        </article>
    `
})


/**
 * Afficher ce composant quand l'utilisateur tape une URL inéxistante ou un id d'un client inéxistant.
 */
export class NotFoundPageComponent { }