import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const isAdmin = () => {
  if (typeof window !== "undefined") {
    if (
      sessionStorage.getItem("Authorization") == undefined ||
      sessionStorage.getItem("Authorization") == null
    ) {
      return false;
    }
    const token = JSON.parse(sessionStorage.getItem("Authorization"));

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

const constructSearchQuery = (params) => {
  const baseURL = "/search?";
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  }

  return baseURL + searchParams.toString();
};

/**
 * Parses search parameters and builds an object with default values for missing fields.
 *
 * @param {useSearchParams} searchParams - The URL search parameters to parse.
 * @returns {Object} The object with fields populated from the search parameters.
 */
function parseSearchParams(searchParams) {
  const stubData = {
    brand: "Brand",
    size: 0,
    name: "Name",
    colour: "Colour",
    gender: "Gender",
    stock: 190,
    price: 100,
    rating: 5,
    category: "Category",
  };

  const result = {};

  for (const key of Object.keys(stubData)) {
    if (searchParams.has(key)) {
      const value = searchParams.get(key);
      result[key] = isNaN(value) ? value : Number(value);
    }
  }
  return result;
}

export {
  cn,
  addAdminLink,
  isAdmin,
  handleOnBlur,
  constructSearchQuery,
  parseSearchParams,
};
