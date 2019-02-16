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
            cy.route({
                method: "DELETE",
                url: "/api/user/invite/*",
                status: 200,
                response: ""
            }).as("deleteInvite")
            cy.visit("/profile")
            cy.get('table[id=sentTable] > tbody > tr').should('have.length', 2)
            cy.get('table[id=pendingTable] > tbody > tr').should('have.length', 1)
            cy.get('#sentTable > tbody > :nth-child(1) > :nth-child(3) > .btn').click()
            cy.get('table[id=sentTable] > tbody > tr').should('have.length', 1)

        })
    })

})