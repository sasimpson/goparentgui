describe("Sleep", () => {
    beforeEach(function(){
        cy.logout()
        cy.fixture('sleep.json').as('sleep')
        cy.login()
    })

    it("loads no data", () => {
        cy.server()
        cy.options()
        cy.route({
            method: "GET",
            url: "/api/sleep",
            status: 200,
            response: {
                "sleepData": null
            }
        }).as("getSleepEmpty")
        cy.get('#children-drop').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()
        cy.visit('/sleep')
        
    })

    it("loads data", () => {
        cy.get('@sleep').then((sleep) => {
            const user1Sleep = sleep['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/sleep",
                status: 200,
                response: user1Sleep
            }).as("getSleep")
            cy.get('#children-drop').click().get('.dropdown-menu > :nth-child(2) > a').click()
            cy.visit('/sleep')
            cy.get('table[id=sleepTable]>tbody>tr').should('have.length', 3)
        })
    })

    it("add item", () => {
        cy.get('@sleep').then((sleep) => {
            const user1Sleep = sleep['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/sleep",
                status: 200,
                response: user1Sleep
            }).as("getSleep")
            cy.route({
                method: "POST",
                url: "/api/sleep",
                status: 202,
                response: {"sleepData": {"id":"93c29968-f937-444b-b8c6-b9ef33abbff2","start":"2018-03-08T08:00:00Z","end":"2018-03-09T08:00:00Z","userid":"1","familyid":"1","childID":"1"}}
             
            }).as("addSleep")
            cy.get('#children-drop').click().get('.dropdown-menu > :nth-child(2) > a').click()
            cy.visit('/sleep')
            cy.get('table[id=sleepTable]>tbody>tr').as('table')
            cy.get("#sleepForm").as("sleepForm")
            cy.get('@table').should('have.length', 3)
            cy.get(':nth-child(1) > .rdt > .form-control').type('03/01/2018 04:00 AM')
            cy.get('h3').click()
            cy.get(':nth-child(2) > .rdt > .form-control').type('03/01/2018 05:30 AM')
            cy.get('h3').click()
            cy.get('#submitButton').click()
            cy.get('div.alert.alert-success')
                .should('be.visible')
                .and('contain','sleep data added')
            cy.get('@table').should('have.length', 4)
        })
    })
})