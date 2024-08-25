import React, { useEffect, useState } from "react";
import AdminServices from "../../services/adminServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { handleOnBlur } from "@/lib/utils";
import { getToken } from "@/lib/utils";

export default function EditCustomerModal({
  showModal,
  setShowModal,
  customer,
}) {
  const [newCustomer, setNewCustomer] = useState({ ...customer });

  useEffect(() => {
    if (showModal) {
      setNewCustomer({ ...customer });
    }
  }, [customer, showModal]);

  const handleNewProduct = (field, e) => {
    let value = e.target.value;
    const x = newCustomer;

    if (field === "email") {
      value = value.split(" ").join("");
    } else if (field != "email" && field !== "address") {
      value = value
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    } else if (field === "address") {
      value = value
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(", ");
    }

    x[field.toLowerCase()] = value;
    setNewCustomer(x);
  };

  const SubmitChanges = async () => {
    const response = await AdminServices.EditCustomer(
      getToken(),
      newCustomer,
      customer.email
    );
    if (response) {
      window.location.reload();
    }
    setShowModal(false);
  };

  const FormInputComponent = ({ label, placeholder, type = "text" }) => {
    const lowerLabel = label.split(" ").join("_").toLowerCase();
    const id = lowerLabel + "_input";

    return (
      <div className="p-2 my-1 w-full">
        <label htmlFor={id} className="text-md">
          {label}
          <span className="text-custom-red">*</span>
        </label>
        <input
          name={id}
          id={id}
          type={type}
          min={0}
          placeholder={placeholder}
          defaultValue={newCustomer[lowerLabel]}
          required
          onChange={(e) => handleNewProduct(lowerLabel, e)}
          className="block border p-1 h-[32px] w-11/12 rounded-md"
          onBlur={() => {
            handleOnBlur(customer, newCustomer);
          }}
        />
      </div>
    );
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Customer Information
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-custom-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form>
                    <fieldset className="border my-4">
                      <legend className="ml-2 text-lg font-medium">Name</legend>
                      <div className="flex ">
                        <FormInputComponent
                          label={"First Name"}
                          placeholder={""}
                        />
                        <FormInputComponent
                          label={"Last Name"}
                          placeholder={""}
                        />
                      </div>
                    </fieldset>
                    <fieldset className="border my-4">
                      <legend className="ml-2 text-lg font-medium">
                        Contact Information
                      </legend>
                      <div className="flex">
                        <FormInputComponent label={"Email"} placeholder={""} />
                        <FormInputComponent
                          label={"Address"}
                          placeholder={""}
                        />
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-custom-red background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className={`bg-gray-200 disabled text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-not-allowed`}
                    type="button"
                    onClick={SubmitChanges}
                    id="save_changes_btn"
                  >
                    Save <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
