describe("Feeding", () => {
    beforeEach(function(){
        cy.logout()
        cy.fixture('feeding.json').as('feeding')
        cy.login()
    })

    it("loads no data", () => {
        cy.server()
        cy.options()
        cy.route({
            method: "GET",
            url: "/api/feeding",
            status: 200,
            response: {
                "feedingData": null
            }
        }).as("getFeedingEmpty")
        cy.route({
            method: "GET",
            url: "/api/feeding/graph/*",
            status: 200,
            response: {
                "dataset": [],
                "start": Date.now(),
                "end": Date.now()
            }
        }).as("feedingGraphEmpty")
        cy.get('#children-drop').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()
        cy.visit('/feeding')
        
    })

    it("loads data", () => {
        cy.get('@feeding').then((feeding) => {
            const user1Feeding = feeding['user1']
            const feedingGraph = feeding['graph1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/feeding",
                status: 200,
                response: user1Feeding
            }).as("getFeeding")
            cy.route({
                method: "GET",
                url: "/api/feeding/graph/*",
                status: 200,
                response: feedingGraph
            }).as("feedingGraph")
            cy.get('#children-drop').click().get('.dropdown-menu > :nth-child(2) > a').click()
            cy.visit('/feeding')
            cy.get('table[id=feedingTable]>tbody>tr').should('have.length', 8)
        })
    })

    it("add item", () => {
        cy.get('@feeding').then((feeding) => {
            const user1Feeding = feeding['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/feeding",
                status: 200,
                response: user1Feeding
            }).as("getFeeding")
            cy.route({
                method: "POST",
                url: "/api/feeding",
                status: 202,
                response:  {
                    "feedingData": {
                        "id": "1231231231212312",
                        "feedingType": "bottle",
                        "feedingAmount": 4,
                        "feedingSide": "",
                        "userid": "1",
                        "familyid": "1",
                        "timestamp": "2018-03-06T05:47:54.529Z",
                        "childID": "1"
                    }
                }              
            }).as("addFeeding")
            cy.route({
                method: "GET",
                url: "/api/feeding/graph/*",
                status: 200,
                response: feedingGraph
            }).as("feedingGraph")
            cy.get('#children-drop').click().get('.dropdown-menu > :nth-child(2) > a').click()
            cy.visit('/feeding')
            cy.get('table[id=feedingTable]>tbody>tr').as('table')
            cy.get("#feedingForm").as("feedingForm")
            cy.get('@table').should('have.length', 8)
            cy.get('#bottle').click()
            cy.get('.input-range').click()
            cy.get("#submitButton").click()
            cy.get('div.alert.alert-success')
                .should('be.visible')
                .and('contain','feeding record added')
            cy.get('@table').should('have.length', 9)
        })
    })
})