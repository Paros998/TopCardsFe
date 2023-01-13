describe( 'Profile Check', () => {

  beforeEach( () => {
    cy.clearAllLocalStorage();
    cy.fixture( 'login' ).then( ( users ) => {
      this.user = users[ 0 ];
    } )
  } )

  it( 'Check profile without user logged', () => {
    cy.visit( '/user/profile' );

    cy.get( 'h1[id=not-found]' )
      .should( 'exist' )
      .should( 'contain.text', "Not Found 404" );
  } )

  it( 'Check profile while logged in', () => {

    cy.loginClient();

    cy.visit( '/user/profile' );

    cy.get( 'h1[id=not-found]' )
      .should( 'not.exist' );

    cy.get( 'input[id=username-input]' )
      .should( 'exist' )
      .should( 'be.disabled' )
      .should( 'have.value', this.user.username );
  } );

} )