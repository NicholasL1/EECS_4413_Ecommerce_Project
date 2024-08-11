import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}


const isAdmin = () => {
  const token = JSON.parse(localStorage.getItem('Authorization'))
  
  if (token) {
    const decodedToken = jwtDecode(token)
    return decodedToken.userData[7]
  } 

  return false
}

const addAdminLink = (links) => {
  if (isAdmin() && links.find(e => {e.name == 'Admin'}) == null) {
    links.push({
      name: 'Admin',
      path: '/admin'
    })
  }
}

export { cn, addAdminLink, isAdmin };
