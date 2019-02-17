describe("Waste", () => {
    beforeEach(function(){
        cy.logout()
        cy.fixture('waste.json').as('waste')
        cy.login()
    })

    it("loads no data", () => {
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
        cy.route({
            method: "GET",
            url: "/api/waste/graph/*",
            status: 200,
            response: {
                "dataset": [],
                "start": Date.now(),
                "end": Date.now()
            }
        }).as("getWasteGraphEmpty")
        cy.get('#children-drop').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()
        cy.visit('/diaper')
        
    })

    it("loads data", () => {
        cy.get('@waste').then((waste) => {
            const user1Waste = waste['user1']
            const wasteGraph = waste['graph1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/waste",
                status: 200,
                response: user1Waste
            }).as("getWaste")
            cy.route({
                method: "GET",
                url: "/api/waste/graph/*",
                status: 200,
                response: wasteGraph
            }).as("getWasteGraph")
            cy.get('#children-drop').click().get('.dropdown-menu > :nth-child(2) > a').click()
            cy.visit('/diaper')
            cy.wait("@getWaste")
            cy.location("pathname").should("eq", "/diaper")
            cy.get('#diaperTable > tbody > tr').should('have.length', 6)
        })
    })

    it("add item", () => {
        cy.get('@waste').then((waste) => {
            const user1Waste = waste['user1']
            const wasteGraph = waste['graph1']

            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/waste",
                status: 200,
                response: user1Waste
            }).as("getWaste")
            cy.route({
                method: "GET",
                url: "/api/waste/graph/*",
                status: 200,
                response: wasteGraph
            }).as("getWasteGraph")
            cy.route({
                method: "POST",
                url: "/api/waste",
                status: 202,
                response: {
                    "wasteData": {
                        "childid": "1",
                        "familyid": "1",
                        "id": "12312312132312312",
                        "notes": "",
                        "timestamp": "2018-02-27T11:22:31-08:00",
                        "userid": "1",
                        "wasteType": 3
                    }
                }               
            }).as("addWaste")
            
            cy.get('#children-drop').click().get('.dropdown-menu > :nth-child(2) > a').click()
            cy.visit('/diaper')
            cy.get("#diaperForm").as("diaperForm")
            cy.get('#diaperTable > tbody > tr').should('have.length', 6)
            // cy.get('.form-control').type('03/01/2018 12:00 AM')
            cy.get("#both").click()
            cy.get("#submitButton").click()
            cy.get('div.alert.alert-success')
                .should('be.visible')
                .and('contain','diaper record added')
            cy.get('#diaperTable > tbody > tr').should('have.length', 7)
        })
    })
})