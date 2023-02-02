Feature:
  In order to manage SIP resources
  As admin
  I should able to perform CRUD operation on paroki resource

  Background:
    Given I have signed in as admin
    And I add 'Content-Type' header equal to 'application/json'
    And I add 'Accept' header equal to 'application/json'
    And I have keuskupan resource with:
    """
    {
      "kode": "001",
      "nomor": 1,
      "nama": "Keuskupan Agung Samarinda"
    }
    """

  Scenario: Successfully Create Paroki
    Given I dont have paroki with kode equal to "001"
    When I send a POST request to paroki with:
    """
    {
      "kode": "001",
      "keuskupan": "keuskupan.id",
      "nomor": 1,
      "nama": "Kristus Raja",
      "gereja": "Kristus Raja"
    }
    """
    Then the response status code should be 201

