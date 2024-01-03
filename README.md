2023/12/22
Abbie's Update

1. Two New packages added in package.json, Materials UI and React Router
2. Fetched Data for Waiting Time.js
3. <MyLocation /> function added, Latitude and Longitude can be found in console

2023/12/23
Ryan's update

1. user and hospital distance calculation done in ./Components/Distance.jsx
2. can display hospital name and distance

2023/12/24 Kelly’s update

1.  uploaded a logo png and changed the icon in index.html (line 5: <link rel="icon" href="%PUBLIC_URL%/hospital.logo.png" />)
2.  changed the icon in index.html (line 30: <title>UrgentTrack</title>)
3.  In Redirection.jsx, add a function for opening Google Maps and Apple Maps. (line 3- line 19)

2023/12/26 Abbie's update

1. New packages added : cors, express, nodemon
2. App.js deleted red p text for latitude and longtitude
3. App.js updated h1 as 香港公立醫院
4. WaitingTime.js updated with new API

2023/12/27 12:00 Abbie's update

1. Updated API1 with CORSANYWHERE

2023/12/27 16:00 Abbie's update

1. Combined WaitTime.jsx with Distance.jsx
2. Deleted WaitTime.jsx
3. App.js deleted red text with latitude and longtitude
4. Distance.jsx added hospital address
5. Distance.jsx added rules for topWait above 2hrs

2023/12/27 18:00 Abbie's update

1. App.js : API props name(type) all updated in Distance.jsx and LastUploadTime.jsx
2. Distance.jsx bug fixed : for Distance API, seperated into 3 useEffect (line 48 to line 62) to fix fetching issue

2023/12/27 23:30 Abbie's update

1. New TimeContext.js created for createContext use
2. App.js : New latestTime useState(line 12), CORS variable (line 15) and TimeContext Provider for latestTime (line 35)
3. Distance.jsx : New param for setLatestTime (line 4), removed latestTime useState (line 12)
4. LastUploadTime.jsx : Updated with useContext hook

2023/12/28 Kelly's update

input icon link in index.html (line 15-line 38)
About CSS of App.js, , Map.jsx, SearchBar.jsx, Filter.jsx, Distance.jsx, style updated to App.module.css.

2023/12/28 Abbie's update

1. Distance.jsx added back contact and website

2023/12/29 Abbie's update

1. Updated Map.jsx with userlocation on default and hospital location with onclick function
2. Distance.jsx added onclick button for Map location (Map.jsx)
3. Deleted MyLocation.jsx and Address.jsx

2023/12/29 22:15 Abbie's update

1. Map.jsx add back description text for userlocation or hospital location
2. Distance.jsx add back desription text for hospital cards

2023/12/30 Kelly's update

1. Updated a bit in CSS ( App.module.css)

2023/12/30 Abbie's update

1. Fixed SearchBar.jsx
2. App.js : Nav Bar created with React Router
3. Distance.jsx is the Homepage
4. SearchBar.jsx rearranged as a child component of Distance.js
5. Map.jsx rearranged as a child comonent of Map.js
6. Created utils.js to store functions (waitingTimeabove2hrs)

2024/01/01 Abbie's update

1. Added phonecall function to the Distance.jsx
2. Added anchor tag to the address in Distance.jsx
3. utils.js added hospitalSpecialistServices object
4. ServicePage.jsx data rendered from utils.js and added buttons
5. ServicePage.jsx added API for BookingWaitTime, data fetched
6. ServicePage.module.css created for new path(/service) styling
7. MUI Material Icons used for both Distance.jsx and ServicePage.jsx

2024/01/01 Kelly's update

update a bit content and CSS in AboutUsPage.js , App.module.css, app.js

2024/01/01 11:30 Abbie's update

1. utils.js new object : hospitalGoogleIframeLink
2. Map.jsx updated using new object

2024/01/02 Abbie's update

1. ServicePage.jsx added Distance and Map
2. New ServicePageButton.jsx
3. District added for both Distance.jsx and ServicePage.jsx

2024/01/02 Kelly's update

1. Updated CSS for AboutUsPage.jsx, Distance.jsx, LastLoadTime.jsx, Map.jsx, ServicePage.jsx ( All CSS were typed in App.module.css)
2. the embed map links have not been updated yet, will update them later

2024/01/02 12:45 Abbie's update

1. Bug fixed for ServicePage.jsx
2. Added back data for "長洲醫院","瑪嘉烈醫院", "北區醫院" inside { hospitalSpecialistServices } from "./utils"

2024/01/02 23：45 Abbie's update

1. ServicePage.jsx added redirection link to HA GO App for booking
   (Apple mobile device will redirect to App store, Andriod --> Google store, Desktop device all redirect to Google store)
2. SearchBar added for ServicePage.jsx
3. Added sorting according button selected with css highlighted(.selected)
4. Added 2 sample images (威爾斯親王醫院, 靈實醫院)inside { hospitalSpecialistServices } from "./utils"
5. Added testing image inside Distance.jsx and ServicePage.js

2024/01/02 11:09 Ryan's update
1.Added all hospital image in utils.js
