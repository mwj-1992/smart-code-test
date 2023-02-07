# Absence Table
- A simple React UI Table to list Absence Members.
- The UI Page is deployed on AWS using Amplifier.
- The UI fetches the data from a lambda.
- The lambda handles (filtering, pagination)

## Notes
- Used Debounce when search in text inputs.

-  `We want to trigger the API call , but only after a user has finished typing in the input.`

- Used React hooks such as (useEffect, useCallback, useState)
-  `We may use memo hooks (useMemo, memo) to cache a component if the compoent is a child and has some props from parent, and we don't want to re-render it if the props not changed, but in our simple code we don't have this.`


## What is missing?
- Unit tests.
- Exporting as Ical.
- Enhancing the UI.


