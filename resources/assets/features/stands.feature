Feature: Viewing stands of exposition event
    As a guest
    I should be able to see stands
    In order to booking stand

    Scenario: View free stand
        Given I go to some event in "http://localhost/"
        When I see "free" stand
        And Stand button "Book Now" was clicked
        Then "Stand" popup should be displayed

    Scenario: View busy stand
        Given I go to some event in "http://localhost/"
        When I see "busy" stand
        And Stand button "View" was clicked
        Then "Sign In" popup should be displayed
