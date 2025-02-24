describe('login', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('success login', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //cy.url('https://www.saucedemo.com/inventory.html')
    cy.url().should('match', /inventory.html/)
  })

  it('failed login', () => {
    cy.get('[data-test="username"]').type('abrakadabra')
    cy.get('[data-test="password"]').type('123')
    cy.get('[data-test="login-button"]').click()
    cy.contains('Epic sadface: Username and password do not match any user in this service')
  })
})

describe('inventory', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('click add to cart', () => {
    //cy.login('standard_user', 'secret_sauce')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.contains('Remove')
  })

  it('click cart', () => {
    //cy.login('standard_user', 'secret_sauce')
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('match', /cart.html/)
  })
})

describe('cart', () => {
  beforeEach(() => {
    cy.addToCart()
  })

  it('removeFromCart', () => {
    //cy.addToCart()
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('[data-test="inventory-item-name"]').should('not.exist')
  })

  it('continue shopping', () => {
    //cy.addToCart()
    cy.get('[data-test="continue-shopping"]').click()
    cy.url().should('match', /inventory.html/)
  })

  it('go to checkout', () => {
    //cy.addToCart()
    cy.get('[data-test="checkout"]').click()
    cy.url().should('match', /checkout-step-one.html/)
  })
})

describe('checkout', () => {
  it('checkout step one cancel', () => {
    cy.checkoutStepOne()
    cy.get('[data-test="cancel"]').click()
    cy.url().should('match', /cart.html/)
  })

  it('checkout step one', () => {
    cy.checkoutData('Maria', 'Ivanova', '1000')
    cy.url().should('match', /checkout-step-two.html/)
  })

  //it('checkoutStepOneInvalidData', () => {
    //cy.checkoutData('', '', '')
    //cy.contains('Error: First Name is required')
    //fill() could not accept empty string
  //})
})

describe('checkout step two', () => {
  beforeEach(() => {
    cy.checkoutStepTwo()
  })
  it('checkout step two cancel', () => {
    //cy.checkoutStepTwo()
    cy.get('[data-test="cancel"]').click()
    cy.url().should('match', /inventory.html/)
  })

  it('Checkout Finish', () => {
    //cy.checkoutStepTwo()
    cy.get('[data-test="finish"]').click()
    cy.url().should('match', /checkout-complete.html/)
  })
})

describe('Chekout Complete', () => {
  it('back home after completed checkout', () => {
    cy.checkoutComplete()
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('match', /inventory.html/)
  })
})

