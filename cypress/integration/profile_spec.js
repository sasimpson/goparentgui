describe("Profile", () => {
    beforeEach(function(){
        cy.fixture('invites.json').as('invites')
        cy.logout()
        cy.login()
        cy.wait(500)
    })

    it("no invites", () => {
        cy.server()
        cy.options()
        cy.route({
            method: "GET",
            url: "/api/user/invite",
            status: 200,
            response: {"sentInviteData":null,"pendingInviteData":null}
        }).as("getInvitesEmpty")
        cy.visit('/profile')
        cy.get('table[id=sentTable]>tbody>tr').should('have.length', 0)
        cy.get('table[id=pendingTable]>tbody>tr').should('have.length', 0)

    })

    it("loads sent invites", () => {
        cy.get('@invites').then((invites) => {
            const user1Invites = invites['user1']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/user/invite",
                status: 200,
                response: user1Invites
            }).as("getInvites")
            cy.visit('/profile')
            cy.get('table[id=sentTable]>tbody>tr').should('have.length', 2)
        })
    })

    it("loads pending invites", () => {
        cy.get('@invites').then((invites) => {
            const user2Invites = invites['user2']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/user/invite",
                status: 200,
                response: user2Invites
            }).as("getInvites")
            cy.visit('/profile')
            cy.get('table[id=pendingTable]>tbody>tr').should('have.length', 1)
        })
    })

    it("remove sent invite", () => {
        cy.get("@invites").then((invites) => {
            const user3Invites = invites['user3']
            cy.server()
            cy.options()
            cy.route({
                method: "GET",
                url: "/api/user/invite",
                status: 200,
                response: user3Invites
            }).as("getInvites")
            cy.visit("/profile")
            cy.get('table[id=sentTable] > tbody > tr').should('have.length', 2)
            cy.get('table[id=pendingTable] > tbody > tr').should('have.length', 1)
            cy.get('#sentTable > tbody > :nth-child(1) > :nth-child(3) > .btn').click()
            cy.get('table[id=sentTable] > tbody > tr').should('have.length', 1)

        })
    })

    it.skip("add item", () => {
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

    it.skip("remove item", () => {
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