// set base API url
// production backend api: https://eecs-4413-ecommerce-project-api.vercel.app/
// development backend api: http://localhost:3001

const api = "https://eecs-4413-ecommerce-project-api.vercel.app";

const headers = {
  "Content-Type": "application/json",
  // "Access-Control-Allow-Origin": "https://6ixkicks.vercel.app",
};

module.exports = { api, headers };
