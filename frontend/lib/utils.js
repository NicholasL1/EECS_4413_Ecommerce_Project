import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const addAdminLink = (links) => {
  // Check if the code is running in the browser
  if (typeof window !== 'undefined') {
    const JWT_token = JSON.parse(localStorage.getItem('Authorization'));
    if (JWT_token) {
      const decodedToken = jwtDecode(JWT_token);
      const isAdmin = decodedToken.userData[7];
      
      // Check if the "Admin" link is already present
      if (isAdmin && !links.find(e => e.name === 'Admin')) {
        links.push({
          name: 'Admin',
          path: '/admin',
        });
      }
    }
  }
};


export { cn, addAdminLink };
