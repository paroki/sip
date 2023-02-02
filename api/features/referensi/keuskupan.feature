Feature:
  In order to manage SIP resources
  As admin
  I should able to perform CRUD operation on keuskupan resource

  Background:
    Given I have signed in as admin
    And I add 'Content-Type' header equal to 'application/json'
    And I add 'Accept' header equal to 'application/json'

  Scenario: Successfully create new keuskupan
    Given I dont have keuskupan with kode equal to "099"
    When I send a POST request to keuskupan with:
    """
    {
      "kode": "099",
      "nama": "New Keuskupan",
      "nomor": 99,
      "namaLatin": "Nama Latin",
      "alamat": "alamat",
      "kota": "Kutai Barat",
      "telepon": "000",
      "fax": "000",
      "website": "http://example.com",
      "email": "email@example.com",
      "uskup": "Mgr. Testing"
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON node id should exist

  Scenario: Successfully read keuskupan
    Given I have keuskupan resource with:
    """
    {
        "kode": "101",
        "nama": "Read Keuskupan",
        "nomor": 101
    }
    """
    When I send a GET request to that resource
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON node id should exist
    And the JSON node nama should be equal to "Read Keuskupan"

  Scenario: Successfully update keuskupan
    Given I have keuskupan resource with:
    """
    {
        "kode": 102,
        "nama": "Update Keuskupan",
        "nomor": 102
    }
    """
    When I send a PUT request to that resource with:
    """
    {
      "namaLatin": "Nama Latin"
    }
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON node namaLatin should be equal to "Nama Latin"

  Scenario: Successfully delete keuskupan
    Given I have keuskupan resource with:
    """
    {
      "kode": 103,
      "nomor": 103,
      "nama": "Keuskupan Delete"
    }
    """
    When I send a DELETE request to that resource
    Then the response status code should be 204
