/// <reference types="Cypress" />
import { faker } from "@faker-js/faker";
import { API_URL, API_KEY, BASE_URL, resetDatabase } from "../utils";

// Les fonctionnalités attendues pour les factures (invoices)
describe("Invoices Features", () => {

  // Testons que l'on peut bien créer une facture pour un client donné
  it("should create and list invoices for a customer", () => {
    // Commençons par créer un client (customer) pour notre test, nous l'appellerons Elise Dupont
    let customerFullName = faker.person.fullName();
    cy.visit(BASE_URL + "create");

    cy.get("[name=fullName]").type(customerFullName);
    cy.get("[name=email]").type(faker.internet.email());

    cy.contains("Enregistrer").click();

    // Théoriquement on se retrouve sur la page d'accueil et on y retrouve le client qu'on vient de créer (Elise Dupont)
    // sous la forme d'un lien cliquable
    cy.contains(customerFullName).first().click();

    // Après avoir cliqué, on devrait être sur la page de détails d'Elise Dupont et voir ses informations
    // Et notamment un lien permettant de créer une invoice dont le texte serait "Créer une facture"
    cy.contains("Créer une facture")
      .first()
      .click()
      .url()
      // Qui devrait nous rediriger vers /:id/invoices/add (:id étant l'identifiant d'Elise Dupont)
      .should("match", /\/\d+\/invoices\/add$/);

    // On devrait trouver un champ dont l'attribut name serait "amount"
    cy.get("[name=amount]")
      .type(1200) // On tape le montant 1200
      // On devrait trouver un champ select avec l'attribut name qui serait "status" et qui contient deux <option>
      .get("select[name=status] option")
      .should("have.length", 2)
      .get("select[name=status]")
      .select("PAID") // On doit pouvoir sélectionner une option dont la valeur est "PAID" (peu importe le texte)
      .select("SENT"); // On sélectionne l'option dont la valeur est "SENT" (peu importe le texte)
    // On cherche ensuite le bouton de soumission dont le texte devrait être "Enregistrer la facture"

    cy.contains("Enregistrer la facture")
      .click()
      .url()
      // On devrait être redirigé vers le détails du client pour lequel on a créé la facture (Elise Dupont)
      .should(
        "match",
        /\/\d+$/,
        "L'adresse aurait du changer pour '/:id' avec l'identifiant d'Elise Dupont 😞"
      );

    // Dans cette page, on s'attend maintenant à trouver un tableau qui liste les factures
    cy.get("table");
    // Et notamment une ligne (<tr>) qui décrirait la facture et contiendrait le montant 1200
    cy.contains("1200");
  });
});
