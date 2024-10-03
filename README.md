# SyncSheets
SyncSheets is an automated solution that synchronizes data between Google Sheets and databases in real-time. It ensures that changes in either platform are instantly reflected in the other, eliminating manual updates and errors. SyncSheets is ideal for businesses needing efficient, scalable data management and collaboration.

# Video Explanation :-
https://drive.google.com/file/d/17XCh46P7JMpKIVdO0UBSLkyRX3sgJ2VZ/view?usp=sharing
Greetings Sir/Mam, 
# Proposed Plan And Work Progress Till Now:- 
Using   Node.js, Express.js for backend<br>                 
postgreSQL for database (running locally using pgadmin4).<br>                                            
Google Sheets API to fetch the credential.json file <br>
OAuth 2.0 with Service Account for authentication
Google App Script to call the API created and set Trigger to automatically call the sync-from-sheets api
# Major Steps Included:-
Setting Up Google Cloud Project<br>
Creating a Service Account<br>
Generating Credentials<br>
Integrating with Google Sheets API<br>
Using Express.js to Create Server APIs:<br>
API 1: /data - Fetches the current data from PostgreSQL.<br>
API 2: /sync-from-db - Syncs changes from the database to the spreadsheet.<br>
API 3: /sync-from-sheets - Syncs changes from the spreadsheet back to the database.<br>

The goal is to ensure that any changes made in either the database or the spreadsheet are reflected in the other Automatically .

# Additional Modulation
Making a react app to provide a clear understanding and proper modulation (No need compulsorily ) this React app will serve to showcase all features clearly, while the automation work can be handled primarily on the backend.
# Progress Made So Far (First 10 Hours of Assignment)
Server setup is complete.
Database Configuration is ready .
Sample Spreadsheet Taken to test all the features is :-https://docs.google.com/spreadsheets/d/1srjxFOL4pHOFwMyQkprvw3zYvWmrmgJnVGWl22B0XcU/edit?gid=0#gid=0
The api/data API is ready.
Setting Up Google Cloud Project,Creating a Service Account,Generating Credentials  Completed 
The sync-from-sheets api JavaScript logic is completed, but integration after generating the credentials.json file is pending same for sync-from-db .
The React app is ready, focusing on proper modulation and showcasing each feature more clearly.

#Google Sheet Automation Service (Google Cloud Project Successfully Running) Keys and Credential ready 
![image](https://github.com/user-attachments/assets/f9f76445-0443-4c77-822d-39562a8c9f5b)


#API TESTING:-
![image](https://github.com/user-attachments/assets/7c773ffe-3c2f-4270-8bb3-0d321f3e99f4)

# Spreadsheet Sample Taken:-
![image](https://github.com/user-attachments/assets/3401b66b-c4ed-4f02-ac0a-72c8b46ecc98)

# PostgreSQL Table:-
![image](https://github.com/user-attachments/assets/a4958557-a2ea-47e5-b5b2-b56edbd7fdc3)

# 27th 6pm:-
All the API's ready testing done using ThunderClient . 
Things to do :- Work on Google App Script to Automate the calling of api on change for now if i change in spreadsheet and then call my sync api data is getting updated.

# AppScript For Automatically calling api on editing Google Spreadsheet:-
![image](https://github.com/user-attachments/assets/83037484-5bbc-4382-8be3-1c7b20664afd)

# Using Ngrok to Expose Localhost api to Google Cloud Appscript for OnEdit Trigger
![image](https://github.com/user-attachments/assets/a87efcdb-9e08-4183-ac7f-b303dba32828)
# Execution Log of OnEdit Trigger in spreadsheet successfull 
![image](https://github.com/user-attachments/assets/b2336add-ba20-48b1-9334-a066eaf4a7e6)
proper illustation in video . (One Way Syncing Completed here)

# TASK COMPLETED:- Automation From Both Side Successfully Implemented . (6am 28th Sep)

# Video Explanation :-
https://drive.google.com/file/d/17XCh46P7JMpKIVdO0UBSLkyRX3sgJ2VZ/view?usp=sharing




