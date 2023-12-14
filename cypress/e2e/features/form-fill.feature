Feature: User Login tests

  Background:
    Given User navigates to the application
    And User expand form layout on sidebar

  Scenario: Grid Form Fill
    When User enter username: "Attila Gyori" and password: "Password" and select option: "Option 2" and press Submit button
    Then Username input field has value: "Attila Gyori"
    And Password input field has value: "Password"
    And Option: "Option 2" is selected

