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
import KJUR from 'jsrsasign'

Cypress.Commands.add("login", () => {
    cy.fixture('authentication.json').as('auth')
    cy.get('@auth').then((auth) => {
        const validAuth = auth['valid_login']
        //our login bits parse out the expiration out of the token so simulate this.
        var oHeader = {alg: 'HS256', typ: 'JWT'};
        // Payload
        var oPayload = {};
        var tNow = KJUR.jws.IntDate.get('now');
        var tEnd = KJUR.jws.IntDate.get('now + 1day');
        oPayload.nbf = tNow;
        oPayload.iat = tNow;
        oPayload.exp = tEnd;
        var sHeader = JSON.stringify(oHeader);
        var sPayload = JSON.stringify(oPayload);
        var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "616161");
        validAuth.token = sJWT;
        cy.visit("/", {
            // onBeforeLoad: (win) => {
            //     win.fetch = null
            // }
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
                        "children": [
                            {
                                "birthday": "2018-02-01T08:00:00Z",
                                "familyID": "1",
                                "id": "1",
                                "name": "Emmie",
                                "parentID": "1"
                            }
                        ]
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

Cypress.Commands.add("logout", () => {
    cy.visit("/logout")
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
