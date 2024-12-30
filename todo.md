# Add Match
## server-side
- listen on endpoint "/api/add-match" for post
- add matches.ts
- check if login is valid
- check if match is valid
- add match to database (with account id)
- return success

# TODO GENERAL
- wrap endpoint in server-side in try catches

# BUGS
- inserting text into input box and then deleting it and submitting

# DONE
- create Add Match page
- make drop down component
- place drop down component for game and result of match
- place a "new rating" numeric field
- gives error if empty or invalid
- add match button
- call post on "/api/add-match" with login info, date, game, result and new rating
- must be logged in screen
- show success/error message
