### Fetch Rewards Coding Exercise

### App Overview
This application allows users to create transactions which return a key value pair of payer and points. This app can also spend points based on a timestamp and therefore spend the points of a payer based on the oldest timestamp and not when the points were most recently added. I used node and express to create this application. Also for sake of ease this application just uses memory instead of a database so that users can test out all routes from creation to updating. When creating this application I faced a few challenges in deciding how to design the database and in figuring out how to spend oldest points instead of the most recent. In the end I was able to overcome these challenges and get the application to work. In the future I would probably implement a database where the transactions can be stored long term and I would also probably re-construct the database so that it is based more on the payer and not the transactions. 

### Dependencies
To run this application you will need to install express and uuid.

To install express run npm i express
To install uuid run npm i uuid

### How to use
To get all transactions run a GET request to the root "/"

To create a new transaction run POST request to the root "/"
with an object in the body of {"payer": "payerName", "points", amountofPointsAsInteger}

To get the balance of all transactions run a GET request to "/balance"

To spend points of oldest points collected by payers run a POST request to "/spend"
with an object in the body of {"points": amountofPointsAsInteger}


