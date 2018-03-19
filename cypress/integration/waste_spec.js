describe("Waste", () => {
    beforeEach(function(){
        cy.fixture('waste.json').as('waste')
        cy.login()
    })

    it.only("loads no data", () => {
        cy.server()
        cy.options()
        cy.route({
            method: "GET",
            url: "/api/waste",
            status: 200,
            response: {
                "wasteData": null
            }
        }).as("getWasteEmpty")
        cy.get('#children-drop').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()
        cy.visit('/waste')
        
    })

    it("loads data", () => {
        cy.get('@waste').then((waste) => {
            const user1Waste = waste['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/waste",
                status: 200,
                response: user1Waste
            }).as("getWaste")
            cy.visit('/waste')
            cy.get('table[id=wasteTable]>tbody>tr').should('have.length', 4)
        })
    })

    it("add item", () => {
        cy.get('@waste').then((waste) => {
            const user1Waste = waste['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/waste",
                status: 200,
                response: user1Waste
            }).as("getWaste")
            cy.route({
                method: "POST",
                url: "/api/waste",
                status: 202,
                response: {
                            "birthday": "2018-03-01T08:00:00Z",
                            "familyID": "1",
                            "id": "5",
                            "name": "Test Waste",
                            "parentID": "1"
                        }                
            }).as("deleteWaste")
            cy.visit('/waste')
            cy.get('table[id=wasteTable]>tbody>tr').as('table')
            cy.get("#childForm").as("childForm")
            cy.get('@table').should('have.length', 4)
            cy.get('#name').type('test child')
            cy.get('.rdt > .form-control').type('03/01/2018 12:00 AM')
            cy.get('h3').click()
            cy.get("#submitButton").click()
            cy.get('div.alert.alert-success')
                .should('be.visible')
                .and('contain','child added')
            cy.get('@table').should('have.length', 5)
        })
    })

    it("remove item", () => {
        cy.get('@waste').then((waste) => {
            const user1Waste = waste['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/waste",
                status: 200,
                response: user1Waste
            }).as("getWaste")
            cy.route({
                method: "DELETE",
                url: "/api/waste/*",
                status: 202,
                response: {"deleted": 1}
            }).as("deleteWaste")
            cy.visit('/waste')
            cy.get('table[id=wasteTable]>tbody>tr').as('table')
            cy.get('@table').should('have.length', 4)
            cy.get('@table').within(($table) => {
                cy.get('button[class*=btn-danger]').first().click()
            })
            cy.get('div.alert.alert-success')
                .should('be.visible')
                .and('contain','child deleted')
            cy.get('@table').should('have.length', 3)
        })
    })
})