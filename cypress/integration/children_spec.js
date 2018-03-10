describe("Children functionality", () => {
    beforeEach(function(){
        cy.fixture('children.json').as('children')
        cy.login()
    })

    it("loads no data", () => {
        cy.server()
        cy.options()
        cy.route({
            method: "GET",
            url: "/api/children",
            status: 200,
            response: {
                "children": null
            }
        }).as("getChildrenEmpty")
        cy.visit('/children')
    })

    it("loads data", () => {
        cy.get('@children').then((children) => {
            const user1Children = children['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/children",
                status: 200,
                response: user1Children
            }).as("getChildren")
            cy.visit('/children')
            cy.get('table[id=childrenTable]>tbody>tr').should('have.length', 4)
        })
    })

    it("add item", () => {
        cy.get('@children').then((children) => {
            const user1Children = children['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/children",
                status: 200,
                response: user1Children
            }).as("getChildren")
            cy.route({
                method: "POST",
                url: "/api/children",
                status: 202,
                response: {
                            "birthday": "2018-03-01T08:00:00Z",
                            "familyID": "1",
                            "id": "5",
                            "name": "Test Child",
                            "parentID": "1"
                        }                
            }).as("deleteChild")
            cy.visit('/children')
            cy.get('table[id=childrenTable]>tbody>tr').as('table')
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
        cy.get('@children').then((children) => {
            const user1Children = children['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/children",
                status: 200,
                response: user1Children
            }).as("getChildren")
            cy.route({
                method: "DELETE",
                url: "/api/children/*",
                status: 202,
                response: {"deleted": 1}
            }).as("deleteChild")
            cy.visit('/children')
            cy.get('table[id=childrenTable]>tbody>tr').as('table')
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