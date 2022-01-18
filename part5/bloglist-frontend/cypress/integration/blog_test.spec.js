describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login to application");
  });

  describe("logging in...", function () {
    beforeEach(function () {
      const user = {
        username: "mr.admin",
        name: "xxx",
        password: "123",
      };
      cy.request("POST", "http://localhost:3000/api/users", user);
      cy.visit("http://localhost:3000");
    });
    it("succeeds with the correct credentials", function () {
      cy.get("#username").type("mr.admin");
      cy.get("#password").type("123");
      cy.get("button[type='submit']").click();

      cy.contains("mr.admin is logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("mr.fake-admin");
      cy.get("#password").type("1234");
      cy.get("button[type='submit']").click();

      cy.get(".error")
        .should("contain", "Invalid credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
      cy.should("not.contain", "mr.admin is logged in");
    });
    describe("after logged in", function () {
      beforeEach(function () {
        cy.request("POST", "http://localhost:3000/api/login", {
          username: "mr.admin",
          password: "123",
        }).then(function (response) {
          localStorage.setItem("loggedInUser", JSON.stringify(response.body));
        });
        cy.visit("http://localhost:3000");
      });
      it("a blog can be added", function () {
        cy.contains("add blog").click();
        cy.get(".title").type("Cypress isn't that hard");
        cy.get(".author").type("mr.admin");
        cy.get(".url").type("https://fakesite.com");
        cy.get("button[type='submit']").click();

        cy.get(".notification")
          .should(
            "contain",
            "a new blog Cypress isn't that hard by mr.admin has been added"
          )
          .and("have.css", "color", "rgb(0, 128, 0)")
          .and("have.css", "background-color", "rgb(211, 211, 211)");
      });
      describe("after logged in and a blog has been posted", function () {
        beforeEach(function () {
          cy.request({
            method: "POST",
            url: "http://localhost:3000/api/blogs",
            body: {
              title: "Cypress isn't that hard",
              author: "mr.admin",
              url: "https://fakeblogsite.com",
            },
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loggedInUser")).token
              }`,
            },
          });
          cy.visit("http://localhost:3000");
        });
        it("that blog can be liked successfully", function () {
          cy.contains("view").click();
          cy.get(".blog-likes").find("button").click();

          cy.get(".blog-likes").contains("likes: 1");
        });

        it("that blog can be deleted by the creator", function () {
          cy.contains("view").click();
          cy.contains("remove").click();

          cy.get("html").should("not.contain", "Cypress isn't that hard");
        });
      });
      describe("when a few blogs have been added", function () {
        beforeEach(function () {
          cy.request({
            method: "POST",
            url: "http://localhost:3000/api/blogs",
            body: {
              title: "first",
              author: "mr.admin",
              url: "https://fakeblogsite.com",
            },
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loggedInUser")).token
              }`,
            },
          });
          cy.request({
            method: "POST",
            url: "http://localhost:3000/api/blogs",
            body: {
              title: "second",
              author: "mr.admin",
              url: "https://fakeblogsite.com",
            },
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loggedInUser")).token
              }`,
            },
          });
          cy.request({
            method: "POST",
            url: "http://localhost:3000/api/blogs",
            body: {
              title: "third",
              author: "mr.admin",
              url: "https://fakeblogsite.com",
            },
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loggedInUser")).token
              }`,
            },
          });
          cy.visit("http://localhost:3000");
        });
        it("blogs are sorted in correct order", function () {
          // first
          cy.contains("first").parent().as("first");
          cy.get("@first").find("button").click();

          cy.get("@first").contains("like").as("first-like");
          cy.get("@first-like").click();
          cy.get("@first").contains("likes: 1");
          cy.get("@first-like").click();
          cy.get("@first").contains("likes: 2");

          // second
          cy.contains("second").parent().as("second");
          cy.get("@second").find("button").click();

          cy.get("@second").contains("like").as("second-like");
          cy.get("@second-like").click();
          cy.get("@second").contains("likes: 1");
          cy.get("@second-like").click();
          cy.get("@second").contains("likes: 2");
          cy.get("@second-like").click();
          cy.get("@second").contains("likes: 3");

          // third
          cy.contains("third").parent().as("third");
          cy.get("@third").find("button").click();

          cy.get("@third").contains("like").as("third-like");
          cy.get("@third-like").click();
          cy.get("@third").contains("likes: 1");
          cy.get("@third-like").click();
          cy.get("@third").contains("likes: 2");
          cy.get("@third-like").click();
          cy.get("@third").contains("likes: 3");
          cy.get("@third-like").click();
          cy.get("@third").contains("likes: 4");

          cy.get(".blog")
            .get(".blog-title")
            .each(function (title, index) {
              cy.wrap(title).as(`${index}`);
              if (index === 0) {
                cy.get("@0").contains("third");
              } else if (index === 1) {
                cy.get("@1").contains("second");
              } else if (index === 2) {
                cy.get("@2").contains("first");
              }
            });
        });
      });
    });
  });
});
