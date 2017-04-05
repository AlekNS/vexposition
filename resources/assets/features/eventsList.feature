Feature: Navigation map on the HomePage
    As a guest
    I should be able to see Map with markers
    In order to view exposition events

    Scenario: View navigation map
        Given I go to "http://localhost/"
        When I see map
        And I see markers on the map
        Then Button "Book your place" should be diactivated

    Scenario: View exposition event information
        Given I go to "http://localhost/"
        When I see map
        And I click any marker
        Then I should see Event Information
        And "Book your place" button should be activated
