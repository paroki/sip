Feature:
    In order to start use application
    As user
    I should be able to login

    Background:
        Given I have user resource with:
            """
            {
                "nama": "Test User",
                "email": "test@example.com",
                "plainPassword": "test"
            }
            """
        And I add 'Content-Type' header equal to 'application/json'
        And I add 'Accept' header equal to 'application/json'

    Scenario: Successfully login
        When I send a POST request to "/auth/login" with body:
        """
        {
            "email": "test@example.com",
            "password": "test"
        }
        """
        Then the response status code should be 200
        And I should be logged in
        And the response should be in JSON
        And the JSON node user_id should exist

    Scenario: Verify Token
        Given I have signed in with email "test@example.com" and password "test"
        When I send a GET request to "/auth/check"
        Then the response status code should be 200
        And the response should be in JSON
        And the JSON node id should exist
        And the JSON node email should be equal to "test@example.com"

    Scenario: Successfully get profile
        Given I have signed in with email "test@example.com" and password "test"
        When I send a GET request to "/auth/profile"
        Then the response status code should be 200
        And the response should be in JSON
        And the JSON node id should exist
        And the JSON node nama should be equal to "Test User"
        And the JSON node roles should exist
