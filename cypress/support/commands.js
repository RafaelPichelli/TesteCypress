import Ajv from "ajv";

//Comando para recuperar o erro da validação do schema
Cypress.Commands.add('getSchemaError',(getAjvError)=>{
    cy.log(getAjvError[0])
    return cy.wrap(
        `Campo: ${getAjvError[0]["instancePath"]} do response body é inválido. Causa: ${getAjvError[0]["message"]}`
    );
})

//Comando para validar Schema
Cypress.Commands.add('validateSchema', (schema,response) =>{
    const ajv = new Ajv();
    cy.fixture(schema).then(etapaSchema => {
        const validate = ajv.compile(etapaSchema);
        const valid = validate(response);

        if (!valid) {
            cy.getSchemaError(validate.errors).then((schemaError) => {
                throw new Error(schemaError);
            });
        } else {
            expect(valid).to.eq(true,'Validação do response body');
        }
    });
})