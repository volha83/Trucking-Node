#Truck Profit Tracker

Render deployment:
https://YOUR-RENDER-LINK.onrender.com

Truck Profit Tracker is a simple web application for tracking weekly trucking income and expenses.

Users can record weekly data such as miles driven, fuel costs, repairs, other expenses, and invoice totals. The application automatically calculates the driver salary (30%) and weekly profit.

The system also provides a yearly summary that shows total income and profit based on paid weeks.

##Features
 - User registration and login (Passport authentication)
 - Secure password hashing with bcrypt
 - Create, read, update, and delete weekly records
 - Automatic salary and profit calculations
 - Yearly financial summary
 - Protected routes with authentication
 - Flash messages for user notifications
       
##Tech Stack
 Node.js
 Express.js
 MongoDB / Mongoose
 EJS (server-side rendering)
 Passport.js
 bcrypt
 express-session
 connect-flash
 helmet
 xss-clean
 express-rate-limit
