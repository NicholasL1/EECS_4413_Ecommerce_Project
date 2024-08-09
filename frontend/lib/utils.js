import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const addAdminLink = (links) => {
  const JWT_token = JSON.parse(localStorage.getItem('Authorization'))
  if (JWT_token) {
    const decodedToken = (jwtDecode(JWT_token))

    // console.log(decodedToken.userData[7])
    const isAdmin = decodedToken.userData[7]
    if (isAdmin && links.find(e => {e.name == 'Admin'}) == null) {
      links.push({
        name: 'Admin',
        path: '/admin'
      })
    }
  }
}

export { cn, addAdminLink };
