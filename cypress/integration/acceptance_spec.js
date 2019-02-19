describe("AT-09 - New User Registration", () => {
    beforeEach(() =>{
        cy.fixture("acceptance_tests/at-9.json").as("tests")
        cy.visit("/")
    })
    it("Main Success Scenario", () => {
        //set up
        cy.server()
        cy.route({
            method: "POST", 
            url: "/api/user/", 
            status: 201,
            response: {
                "id": "1",
                "name": "Test User", 
                "email": "test.user@test.com",
                "username": "test.user@test.com",
                "current_family": "1"
            }
        })
        cy.location("pathname").should("eq", "/login")

        //step 1
        cy.get("#registerLink").click()
        cy.location("pathname").should("eq","/register").as("step 1")
        //step 2
        cy.get("h3").should("contain", "Register New User").as("step 2")
        //step 3
        cy.get("#name").type("Test User")
        cy.get("#email").type("test.user@test.com")
        cy.get("#password1").type("testpassword1234")
        cy.get("#password2").type("testpassword1234")
        cy.get('.form-control').each(($v, i, l)=>{
            cy.wrap($v, {log: false}).should("not.have.value", "")
        }).as("step 3")
        cy.get('.form-group[id=passGroup]').should("not.have.class", "has-error")
        //step 4
        cy.get("#submitButton").click().as("step 4")
        //step 5
        cy.location("pathname").should("eq", "/login").as("step 5")
    })

    it("Extension 1 - Invalid Password", () => {
        cy.location("pathname").should("eq", "/login")

        //step 1
        cy.get("#registerLink").click()
        cy.location("pathname").should("eq","/register").as("step 1")
        //step 2
        cy.get("h3").should("contain", "Register New User").as("step 2")
        //step 3
        cy.get("#name").type("Test User")
        cy.get("#email").type("test.user@test.com")
        cy.get("#password1").type("testpassword1234")
        cy.get("#password2").type("testpassword1234")
        cy.get(".form-control").each(($v, i, l)=>{
            cy.wrap($v, {log: false}).should("not.have.value", "")
        }).as("step 3")
        //step 3.1.a
        cy.get("input[id=password2]").type("invalid").as("step 3.1.a")
        //step 3.1.b
        cy.get(".form-group[id=passGroup]").should("have.class", "has-error").as("step 3.1.b")       
    })
    it("Extension 2 - Already registered", () => {
        //set up
        cy.server()
        cy.route({
            method: "POST", 
            url: "/api/user/", 
            status: 409,
            response: {
               "error": {
                   "code": 409,
                   "body": "user exists"
               }
            }
        })
        cy.location("pathname").should("eq", "/login")

        //step 1
        cy.get("#registerLink").click()
        cy.location("pathname").should("eq","/register").as("step 1")
        //step 2
        cy.get("h3").should("contain", "Register New User").as("step 2")
        //step 3
        cy.get("#name").type("Test User")
        cy.get("#email").type("test.user@test.com")
        cy.get("#password1").type("testpassword1234")
        cy.get("#password2").type("testpassword1234")
        cy.get(".form-control").each(($v, i, l)=>{
            cy.wrap($v, {log: false}).should("not.have.value", "")
        }).as("step 3")
        //step 4.2.a
        cy.get("#submitButton").click().as("step 4.2.a")
        //step 4.2.b
        cy.location("pathname").should("eq", "/register").as("step 4.2.b")
    })
})