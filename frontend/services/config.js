// set base API url
// production backend api: https://eecs-4413-ecommerce-project-api.vercel.app/
// development backend api: http://localhost:3001

const api = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
};

module.exports = { api, headers };
