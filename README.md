# EECS_4413_Ecommerce_Project

Steps to download and run locally:
1. Clone the repo:
 ```git clone https://github.com/Ammadq87/EECS_4413_Ecommerce_Project.git```

 2. Open the project in a code editor (Eg. VSCode):
 ```
 cd EECS_4413_Ecommerce_Project
 code .
 ```
 3. Checkout development branch, the main branch is used for production server, the development branch is up to date with changes
 ```
 git checkout development
 ```
 4. Rename `.env.sample` to `.env` and replace with the following info:
 ```
PORT = 3001
MONGO_URI = mongodb+srv://NicholasL1:EECS4413ecommerceproj@eecs4413-cluster.ayaqwdg.mongodb.net/EECS4413-Database?retryWrites=true&w=majority&appName=EECS4413-Cluster
JWT_SECRET = 5af53784373e542ee1c6c27b4eab72d337b93164b7f39a38aa74e72b008b6b6c50cf34230fe2575ccd1be639bfbe9da0d24a119c32065cee484eb831a21a5c55
 ```
 5. Download dependencies and run the server in frontend and backend folders:
 ```
 cd backend
 npm i
 npm run dev

 cd frontend
 npm i 
 npm run dev
 ```
6. Access the `http://localhost:3000` in your browser, you can now browse 6ixkicks!

Github Repo: https://github.com/Ammadq87/EECS_4413_Ecommerce_Project/tree/development

Online URL: https://6ixkicks.vercel.app/
