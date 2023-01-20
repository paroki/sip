Feature:
    In order to manage user
    As admin
    I should able to perform CRUD operation on user resource

    Background:
        Given I have signed in as admin
        And I add 'Content-Type' header equal to 'application/json'
        And I add 'Accept' header equal to 'application/json'

    Scenario: Create user with invalid role
        Given I have signed in
        When I send a POST request to user with:
            """
            {
                "email": "invalid@example.com",
                "plainPassword": "test"
            }
            """
        Then the response status code should be 403

    Scenario: Successfully create user
        Given I dont have user with email equal to "user@example.com"
        When I send a POST request to user with:
            """
            {
                "email": "user@example.com",
                "plainPassword": "sip"
            }
            """
        Then the response status code should be 201

    Scenario: Succesfully Read User
        Given I have user resource with:
            """
            {
                "email": "read@example.com",
                "plainPassword": "test",
                "roles": ["ROLE_USER"]
            }
            """
        When I send a GET request to that resource
        Then the response status code should be 200
        And the JSON node "id" should exist
        And the JSON node "email" should be equal to "read@example.com"
        And the JSON node "updatedAt" should exist
        And the response should contain "ROLE_USER"

    Scenario: Succesfully Update user
        Given I have user resource with:
            """
            {
                "email": "exist@example.com",
                "plainPassword": "test",
                "roles": ["ROLE_USER"]
            }
            """
        When I send a PUT request to that resource with:
            """
            {
                "roles": ["ROLE_ADMIN"]
            }
            """
        Then the response status code should be 200
        And the response should be in JSON
        And the JSON node "id" should exist
        And the JSON node "email" should be equal to "exist@example.com"
        And the JSON node "updatedAt" should exist
        And the response should contain "ROLE_ADMIN"

    Scenario: Successfully Delete user
        Given I have user resource with:
            """
            {
                "email": "exist@example.com",
                "plainPassword": "test",
                "roles": ["ROLE_USER"]
            }
            """
        When I send a DELETE request to that resource
        Then the response status code should be 204

