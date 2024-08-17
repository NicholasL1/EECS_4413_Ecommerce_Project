import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const isAdmin = () => {
  if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("Authorization"));

    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userData[7];
    }
  }

  return false;
};

const addAdminLink = (links) => {
  if (
    isAdmin() &&
    links.find((e) => {
      e.name == "Admin";
    }) == null
  ) {
    links.push({
      name: "Admin",
      path: "/admin",
    });
  }
};

const handleOnBlur = (old_obj, new_obj, checkAll = false) => {
  let formChange = false;
  let fields_filled = 0;

  for (const [key, value] of Object.entries(new_obj)) {
    if (!checkAll && old_obj[key] !== value) {
      formChange = true;
      break;
    } else {
      if (new_obj[key] !== null) fields_filled++;
    }
  }

  if (checkAll) formChange = fields_filled === Object.keys(new_obj).length;

  // manipulate DOM to avoid re-render --> input loses focus on re-render
  if (formChange) {
    const save_changes_btn = document.getElementById("save_changes_btn");
    save_changes_btn.disabled = false;
    save_changes_btn.style.backgroundColor = "#272f29";
    save_changes_btn.style.cursor = "pointer";
    save_changes_btn.className += " active:bg-custom-black";
  }
};

export { cn, addAdminLink, isAdmin, handleOnBlur };
