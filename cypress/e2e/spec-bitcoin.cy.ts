describe( 'Bitcoin Functions', () => {

  beforeEach( () => {
    cy.addGpus();

    cy.clearAllLocalStorage();

    cy.loginClient();
  } )

  it( 'Check bitcoin data', () => {

    cy.visit( '/products/for-crypto-miners' );

    cy.intercept( 'GET', '**/crypto-currencies/bitcoin/info?userId=**' ).as( 'GetBitcoinData' )

    cy.wait( '@GetBitcoinData' )
      .should( ( { request, response } ) => {
        expect( response ).property( 'statusCode' ).to.equal( 200 )
      } )

    cy.get( 'span[id=bitcoin-daily-rate]' )
      .should( 'not.be.empty' );

    cy.get( 'span[id=bitcoin-value]' )
      .should( 'not.be.empty' );

    cy.get( 'span[id=bitcoin-total-hash]' )
      .should( 'not.be.empty' );

    cy.get( 'span[id=bitcoin-daily-blocks]' )
      .should( 'not.be.empty' );

    cy.get( 'div[id=bitcoin-cards]' )
      .should( 'not.be.empty' );
  } )

} )