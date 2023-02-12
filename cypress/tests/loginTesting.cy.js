
describe("Login testing", () => {

    it('should login', () => {
        cy.api({
            method:"POST",
            url:"login",
            body:{
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        }).then((response)=> {
            expect(response.status).to.eq(200);
            cy.validateSchema('postLoginSchema', response.body);
        })
    })

    it('shouldn´t login, missing password', () => {
        cy.api({
            method:"POST",
            url:"login",
            body:{
                email: "eve.holt@reqres.in"
            },
            failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.token).to.not.exist;
            expect(response.body.error).to.eq("Missing password");
        })
    })

    it('shouldn´t login, missing email', () => {
        cy.api({
            method:"POST",
            url:"login",
            body:{
                password: "cityslicka"
            },
            failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.token).to.not.exist;
            expect(response.body.error).to.eq("Missing email or username");
        })
    })

    it('shouldn´t login, wrong email', () => {
        cy.api({
            method:"POST",
            url:"login",
            body:{
                email: "eve.holt",
                password: "cityslicka"
            },
            failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.token).to.not.exist;
            expect(response.body.error).to.eq("user not found");
        })
    })

    it('shouldn´t login, wrong password', () => {
        cy.api({
            method:"POST",
            url:"login",
            body:{
                email: "eve.holt@reqres.in",
                password: "wrong"
            },
            failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.token).to.not.exist;
            expect(response.body.error).to.eq("Incorrect email or password");
        })
    })

})
