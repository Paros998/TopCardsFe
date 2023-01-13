describe( 'Login', () => {

  beforeEach( () => {
    cy.fixture( 'login' ).then( ( users ) => {
      this.user = users[ 0 ];
    } )
    cy.visit( '/login' )
  } )

  it( 'Login Form Yup Validation', () => {

    cy.get( 'input[name=username]' )
      .type( "a" ).should( 'have.value', "a" );

    cy.get( 'span[id=username-error]' )
      .should( 'contain', "Username must have at least 6 symbols" )

    cy.get( 'span[id=password-error]' )
      .should( 'contain', "Password cannot be empty" )

    cy.get( 'input[name=username]' )
      .type( "ndrea" ).should( 'have.value', "andrea" )

    cy.get( 'span[id=username-error]' )
      .should( 'be.empty' )

    cy.get( 'input[name=password]' )
      .type( "client1234" ).should( 'have.value', "client1234" )

    cy.get( 'span[id=password-error]' )
      .should( 'be.empty' )

  } )

  it( 'Login Request', () => {

    cy.get( 'input[name=username]' )
      .type( this.user.username ).should( 'have.value', this.user.username );

    cy.get( 'input[name=password]' )
      .type( "client123" ).should( 'have.value', "client123" )

    cy.intercept( 'POST', '**/login' ).as( 'LoginSubmit' )

    cy.get( 'button[type=submit]' ).click()

    cy.wait( '@LoginSubmit' )
      .should( ( { request, response } ) => {
        expect( response ).property( 'statusCode' ).to.equal( 401 )
      } )

    cy.get( 'input[name=password]' )
      .clear()
      .type( this.user.password ).should( 'have.value', this.user.password )

    cy.get( 'button[type=submit]' ).click()

    cy.wait( '@LoginSubmit' )
      .should( ( { request, response } ) => {
        expect( response ).property( 'statusCode' ).to.equal( 200 )
      } )

    cy.clearAllLocalStorage();

    cy.reload()

  } )

} )