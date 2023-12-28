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
