describe('Register testing', () => {

    it('should register user', () => {
        cy.api("POST","register",
            {
                email: "eve.holt@reqres.in",
                password: "pistol"
            }).then((response)=> {
            expect(response.status).to.eq(200);
            cy.validateSchema('postRegisterSchema', response.body);
        })
    })

    it('shouldn´t register user, missing password', () => {
        cy.api({method:"POST",
            url:"register",
            body:{
                email: "eve.holt@reqres.in"
                },
            failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.id).to.not.exist;
            expect(response.body.token).to.not.exist;
            expect(response.body.error).to.eq("Missing password");
        })
    })

    it('shouldn´t register user, missing email', () => {
        cy.api({method:"POST",
            url:"register",
            body:{
                password: "pistol"
            },
            failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.id).to.not.exist;
            expect(response.body.token).to.not.exist;
            expect(response.body.error).to.eq("Missing email or username");
        })
    })

    it('shouldn´t register user, missing body', () => {
        cy.api({method:"POST",
            url:"register",
            failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.id).to.not.exist;
            expect(response.body.token).to.not.exist;
            expect(response.body.error).to.eq("Missing email or username"); //Alterar a mensagem que é recebida quando o body não é enviado.
        })
    })


})
