import KJUR from 'jsrsasign'

describe("Authentication", () => {
    beforeEach(() => {
        cy.fixture('authentication.json').as('auth')
        cy.visit('/login', {
            onBeforeLoad: (win) => {
              win.fetch = null
            }
          })
    })
    it("display error on failed login", () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/api/user/login', 
            status: 401,
            response: 'no result for that username password combo'
        }).as("postLogin")

        cy.get('input[id=email]').type('test@test.com')
        cy.get('input[id=password]').type("testfail123{enter}")
        // cy.wait('@postLogin')
        cy.get('div.alert.alert-danger')
            .should('be.visible')
            .and('contain','login failed, please check email and password')
    })
    it("login successful", () => {
        cy.get('@auth').then((auth) => {
            const validAuth = auth['valid_login']

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
            cy.server()
            cy.route({
                method: "POST",
                url: "/api/user/login",
                status: 200,
                response: validAuth
            }).as("postLogin")

            cy.options()

            cy.route({
                method: "GET",
                url: "/api/children",
                status: 200,
                response: {
                    "children": null
                }
            })

            cy.get('input[id=email]').type('test@test.com')
            cy.get('input[id=password]').type("testsuccess{enter}")
            cy.wait('@postLogin')
            cy.get('.alert').should('be.visible')
        })
    })
    // context("redirects", () => {
    //     ['children','sleep','diaper','feeding','profile'].forEach( (route) => {
    //         it(route, () => {
    //             cy.visit('/' + route)
    //             cy.location('pathname').should('eq', '/login')
    //         })
    //     })
    // })
    // it("logout", () => {
    //     cy.login()
    //     cy.location('pathname').should('eq','/')
    //     cy.get('.navbar-right > :nth-child(2) > a').click()
    //     cy.location('pathname').should('eq','/login')
    // })
})
