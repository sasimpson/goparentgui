// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
Cypress.Commands.add("login", (email, password) => {
    cy.fixture('authentication.json').as('auth')
    cy.get('@auth').then((auth) => {
        const validAuth = auth['valid_login']
        cy.visit("/", {
            onBeforeLoad: (win) => {
                win.fetch = null
            }
        })
        cy.server()
        cy.route({
            method: "POST",
            url: "/api/user/login",
            status: 200,
            response: validAuth
        }).as("doLogin")

        cy.options()
        cy.route({
            method: "GET",
            url: "/api/children",
            status: 200,
            response: {
                "children": null
            }
        }).as("getChildrenAfterLogin")

        cy.get('input[id=email]').type('test@test.com')
        cy.get('input[id=password]').type("testsuccess{enter}")
    })
})

Cypress.Commands.add("options", () => {
    cy.route({
        method: "OPTIONS",
        url: "/api/*",
        status: 200,
        headers: {
            'Access-Control-Allow-Headers':  'Authorization,Content-Type',
            'Access-Control-Allow-Origin':   '*'
        },
        response: ""
    })
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
