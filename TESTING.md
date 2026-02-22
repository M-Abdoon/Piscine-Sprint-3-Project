TESTING.md

1. Input for Comma-Separated Users

I tested the input by entering a list of users separated by commas. The program accepted the input correctly.

2. Fetching Data from Codewars API

When I submitted the list of users, the program fetched the data from the Codewars API for each user. I verified that the information displayed matched the data on Codewars.

3. Language Drop-Down Based on Leaderboard

After fetching the data, a drop-down menu appeared. It included all the possible language rankings plus the overall ranking. I tested this by checking the drop-down options for accuracy.

4. Default Overall Ranking

I checked that the drop-down initially selected the overall ranking by default. The table displayed the overall scores correctly.

5. Table Display for Current Ranking

I verified that a table is shown for the currently selected ranking. The table includes columns for username, clan, and score for each user.

6. Updating Table When Ranking Changes

I tested changing the selected ranking from the drop-down. The table updated correctly to reflect the new ranking without errors.

7. Table Sorted from Highest to Lowest

I confirmed that the table is sorted from the highest score at the top to the lowest at the bottom for every ranking.

8. Users Without Ranking Are Not Shown

I tested users with no ranking in a selected language. These users were correctly hidden from the table for that ranking.

9. Highlighting Top User

I checked that the top user in each ranking is visually highlighted. The highlighting updates when the ranking changes.

10. Accessibility Score

I used Lighthouse to test accessibility. The website scored 100, meaning all accessibility standards are met.

11. Unit Tests

Unit tests were written in tests/logic.test.js. I tested the function that processes user data for the leaderboard. All tests passed successfully.

12. Handling Non-Existent Users

When searching for a user that does not exist, a clear message is shown to inform the user.

13. Handling Multiple Users with Invalid Entries

If multiple users are searched and some do not exist, the program shows the valid users and informs the user about the invalid ones.

14. Handling API Errors

I tested errors from the Codewars API, such as being offline or making a bad request. The program showed a useful error message in the UI.
