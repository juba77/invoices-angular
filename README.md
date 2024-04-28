# Invoices App

Projet d'IHM WEB.

## Sommaire

1. [Objectifs Principaux](#1-objectifs-principaux)
2. [Résultats Supplémentaires](#2-résultats-supplémentaires)
   - 2.1 [Fonctionalités Supplémentaires](#21-fonctionalités-supplémentaires)
   - 2.2 [Sécurité et Validation](#22-sécurité-et-validation)
   - 2.3 [Tests et Documentation](#23-tests-et-documentation)
   - 2.4 [Design et Interactivité](#24-design-et-interactivité)
3. [Lancer l'application](#3-lancer-lapplication)

## 1. Objectifs Principaux

- Les tests Cypress passent à 100%.
- Le cahier des charges est réalisé à 100%.

> **NOTE IMPORTANTE** : Dans de rares cas, les tests Cypress peuvent échouer en raison de validations restrictives sur les formulaires, car les entrées générées par Faker ne sont pas toujours propres. Si cela se produit, veuillez simplement relancer le test Cypress.

## 2. Résultats Supplémentaires

### 2.1 Fonctionalités Supplémentaires

- Recherche de clients dans la liste.
- Suppression d'un client.
- Suppression d'une facture.
- Changement du statut d'une facture.

### 2.2 Sécurité et Validation

- Validation de tous les champs des formulaires.
- Gestion de toutes erreurs des requêtes API avec redirection vers la page d'erreur.
- Gestion des clients non trouvés avec redirection vers la page "Non trouvé".
- Gestion des URL non trouvés avec redirection vers la page "Non trouvé".

###  2.3 Tests et Documentation

- Tests de toutes les fonctionnalités (50 tests implémentés).
- Documentation complète de toutes les classes de l'application.

### 2.4 Design et Interactivité

- Formulaires interactifs avec affichage des textes et changement de couleurs.
- Possibilité de masquer et d'afficher les listes des factures et des clients.
- Fenêtre modale de confirmation de suppression.

## 3. Lancer l'application

```bash
# Pour lancer l'application
npm run serve

# Pour lancer les tests Jasmine
npm run test

# Pour lancer Cypress sans le navigateur
npm run cy:run

# Pour lancer Cypress avec le navigateur
npm run cy:open

```