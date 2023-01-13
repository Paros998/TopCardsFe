/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { User } from "./interfaces/User";

Cypress.Commands.add( 'loginClient', () => {
  cy.fixture( 'login' ).then( ( users ) => {
    cy.login( users[ 0 ] );
  } );

} )

Cypress.Commands.add( 'loginAdmin', () => {
  cy.fixture( 'login' ).then( ( users ) => {
    cy.login( users[ 1 ] );
  } );
} )

Cypress.Commands.add( 'login', ( user: User ) => {
  cy.visit( '/login' );

  cy.get( 'input[name=username]' )
    .type( user.username ).should( 'have.value', user.username );

  cy.get( 'input[name=password]' )
    .type( user.password ).should( 'have.value', user.password )

  cy.intercept( 'POST', '**/login' ).as( 'LoginSubmit' )

  cy.get( 'button[type=submit]' ).click()

  cy.wait( '@LoginSubmit' )
    .should( ( { request, response } ) => {
      expect( response ).property( 'statusCode' ).to.equal( 200 )
    } )
} );

Cypress.Commands.add( 'addGpus', () => {
  cy.loginAdmin();

  cy.fixture( 'cards' ).then( ( cards ) => {
    cards.forEach( card => {

      cy.request( {
        method: 'POST',
        url: `${ Cypress.env( 'baseApiUrl' ) }/cards/CreateCardCommand`,
        body: card,
        failOnStatusCode: false
      } )

      cy.wait( 2000 )

    } );
  } );
} )