
describe('User testing', () => {

  let id = 2;

  it('should list users', () => {
    cy.api("GET","users?page=1").then((response)=> {
      expect(response.status).to.eq(200);
      cy.validateSchema('getUsersListSchema', response.body);
      for(let  i = 2; i<=response.body.total_pages;i++){
        cy.api("GET","users?page="+i).then((response)=> {
          expect(response.status).to.eq(200);
          cy.validateSchema('getUsersListSchema', response.body);
        })
      }
    })
  })

  it('should get a single user', () => {
    cy.api("GET","users/"+ id).then((response)=> {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(id);
      cy.validateSchema('getUserSchema', response.body);
    })
  })

  it('shouldn´t found a user', () => {
    cy.api({method:"GET",url:"users/9999",failOnStatusCode: false}).then((response)=> {
      expect(response.status).to.eq(404);
    })
  })

  it('should list users with delay', () => {
    cy.api("GET","users?delay=3").then((response)=> {
      expect(response.status).to.eq(200);
      cy.validateSchema('getUsersListSchema', response.body);
    })
  })

  it('should update a user, PUT method', () => {
    cy.api("PUT","users/9",
        { name: "morpheus",
          job: "zion resident"
        }).then((response)=> {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("morpheus");
      expect(response.body.job).to.eq("zion resident");
      expect(response.body.updatedAt).to.be.a('string');
    })
  })

  it('should update a user, PATCH method', () => {
    cy.api("PATCH","users/9",
        { name: "morpheus",
          job: "zion resident"
        }).then((response)=> {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("morpheus");
      expect(response.body.job).to.eq("zion resident");
      expect(response.body.updatedAt).to.be.a('string');
    })
  })

  it('should delete a user', () => {
    cy.api("DELETE","users/2").then((response)=> {
      expect(response.status).to.eq(204);
    })
  })

  it('should update a user that does not exists, PUT method', () => {
    cy.api("PUT","users/9999",
        { name: "morpheus",
          job: "zion resident"
        }).then((response)=> {
      expect(response.status).to.eq(404);
      expect(response.body.name).to.not.exist;
      expect(response.body.job).to.not.exist;
      expect(response.body.updatedAt).to.not.exist;
    })
  })

  it('should update a user that does not exists, PATCH method', () => {
    cy.api("PATCH","users/9999",
        { name: "morpheus",
          job: "zion resident"
        }).then((response)=> {
      expect(response.status).to.eq(404);
      expect(response.body.name).to.not.exist;
      expect(response.body.job).to.not.exist;
      expect(response.body.updatedAt).to.not.exist;
    })
  })

  it('should delete a user that does not exists', () => {
    cy.api("DELETE","users/9999").then((response)=> {
      expect(response.status).to.eq(404);
    })
  })

  it('should create user', () => {
    cy.api("POST","users",
        { name: "morpheus",
          job: "leader"
        }
    ).then((response)=> {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq("morpheus");
      expect(response.body.job).to.eq("leader");
      expect(response.body.id).to.be.a('number');
      expect(response.body.createdAt).to.be.a('string');
    })
  })

  it('shouldn´t create user, missing name', () => {
    cy.api({method:"POST",url:"users",body:
          {
            job: "leader"
          },
      failOnStatusCode:false}).then((response)=> {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.not.exist;
      expect(response.body.job).to.not.exist;
      expect(response.body.id).to.not.exist;
      expect(response.body.createdAt).to.not.exist;
    })
  })

  it('shouldn´t create user, missing job', () => {
    cy.api({method:"POST",url:"users",body:
          {
            name: "morpheus"
          },
      failOnStatusCode:false}).then((response)=> {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.not.exist;
      expect(response.body.job).to.not.exist;
      expect(response.body.id).to.not.exist;
      expect(response.body.createdAt).to.not.exist;
    })
  })
})