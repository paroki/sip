Feature:
    Test Javascript

    @ui
    Scenario: Test
        Given I am on the homepage
        And I wait for the page to be loaded
        Then the response status code should be 200
        And the response should contain "login"

