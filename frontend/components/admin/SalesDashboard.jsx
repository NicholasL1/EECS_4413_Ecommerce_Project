import { useEffect, useState } from "react";
import AdminServices from "../../services/adminServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faSackDollar,
  faUsers,
  faCartShopping,
  faBoxOpen,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import SalesChart from "./SalesChart";
import Loading from "../ui/Loading";
import ShoeView from "../ui/ShoeView";

export default function SalesDashboard() {
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });

  const [totals_data, setTotalsData] = useState(null);

  const [showProductSpecific, setShowProductSpecific] = useState(false);

  const [productSpecificInfo, setProductSpecificInfo] = useState([]);
  const [salesToDate, setSalesToDate] = useState(null);
  const [errorLabel, setErrorLabel] = useState(null);

  const viewBtnStyle =
    "p-1 px-3 border-b-2 text-blue-500 font-medium border-b-blue-500";
  const iconStyle =
    "w-[16px] h-[16px] p-2 mr-3 rounded-full text-white shadow-md";

  const icon_mapping = {
    "Total Sales": (
      <FontAwesomeIcon
        icon={faSackDollar}
        className={`${iconStyle} bg-[#F9C610]`}
      />
    ),
    "Total Sold": (
      <FontAwesomeIcon
        icon={faBoxOpen}
        className={`${iconStyle} bg-[#F9844D]`}
      />
    ),
    "Total Products": (
      <FontAwesomeIcon
        icon={faShoppingBag}
        className={`${iconStyle} bg-[#FF70BF]`}
      />
    ),
    "Total Customers": (
      <FontAwesomeIcon icon={faUsers} className={`${iconStyle} bg-[#5982C5]`} />
    ),
    "Total Orders": (
      <FontAwesomeIcon
        icon={faCartShopping}
        className={`${iconStyle} bg-[#6EB257]`}
      />
    ),
  };

  const handleShowProductSpecific = (current_tab) => {
    if (current_tab === "general_sales" && showProductSpecific) {
      setShowProductSpecific(false);
    } else if (current_tab === "product_stats" && !showProductSpecific) {
      setShowProductSpecific(true);
    }
  };

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("Authorization"));
      const response = await AdminServices.GetTotals(token);
      setTotalsData(response.data.totals);
      setProductSpecificInfo(response.data.shoes);
      console.log(response.data.dates);
      setSalesToDate(response.data.dates);
    } catch (err) {
      setErrorLabel(err.message);
      setTotalsData(null);
      setProductSpecificInfo(null);
      setSalesToDate(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const OrderedByView = (product) => {
    return (
      <div id="user_info" className="p-2 ">
        <div className="h-[256px] overflow-y-scroll">
          {product.users?.map((user, i) => {
            return (
              <div
                key={i}
                className="flex justify-start items-center my-3 shadow-sm rounded-sm border border-gray-100 mr-4"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  className="p-2 rounded-full"
                />
                <div className="flex flex-col space-y-0">
                  {/* TODO -- Add link to user profile */}
                  <a href="">
                    <p className="text-custom-black font-medium p-0 m-0">
                      {user?.first_name + " " + user?.last_name}
                    </p>
                  </a>
                  <p className="text-gray-500 text-sm p-0 m-0">{user?.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        id="SalesDashboard"
        className="h-full w-full ml-4 p-4 shadow-md rounded-md bg-white"
      >
        <h2 className="text-3xl font-medium">Sales</h2>
        <hr className="my-3" />

        {errorLabel === null &&
          (totals_data === null ||
            productSpecificInfo === null ||
            salesToDate === null) && <Loading />}

        {errorLabel === null &&
          (totals_data === null ||
            productSpecificInfo === null ||
            salesToDate === null) && (
            <div className="text-center">
              <span>{errorLabel}</span>
            </div>
          )}

        {totals_data != null &&
          productSpecificInfo != null &&
          salesToDate != null && (
            <div>
              <div className="flex flex-row gap-4 text-gray-500 ">
                <button
                  onClick={() => {
                    handleShowProductSpecific("general_sales");
                  }}
                  className={`${!showProductSpecific ? viewBtnStyle : ""}`}
                >
                  General Sales
                </button>
                <button
                  onClick={() => {
                    handleShowProductSpecific("product_stats");
                  }}
                  className={`${showProductSpecific ? viewBtnStyle : ""}`}
                >
                  Product Stats
                </button>
              </div>
              {!showProductSpecific && (
                <div>
                  <div className="my-8 flex flex-row gap-4">
                    {totals_data !== null &&
                      totals_data?.map((total, i) => {
                        return (
                          <div
                            key={i}
                            className="h-[96px] w-1/5 text-center rounded-md shadow-md flex flex-col justify-center bg-white border border-gray-100"
                          >
                            <div className="flex justify-center items-center">
                              {icon_mapping[total.title]}
                              <p className="text-gray-600 text-lg pb-1">
                                {total.title}
                              </p>
                            </div>
                            <p className="text-custom-black text-3xl font-bold pt-1 pb-2">
                              {total.value}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  {salesToDate !== null && <SalesChart dates={salesToDate} />}
                </div>
              )}
              {showProductSpecific && productSpecificInfo.length > 0 && (
                <div>
                  <div id="CustomerResultPage" className="my-4">
                    <DataTable
                      value={productSpecificInfo}
                      paginator
                      rows={50}
                      rowsPerPageOptions={[50, 100, 200]}
                      stripedRows
                      filters={filters}
                      sortField="price"
                      sortOrder={-1}
                      showGridlines
                    >
                      <Column
                        header="Shoe"
                        body={(data) => (
                          <ShoeView shoe={data.shoe} adminView={true} />
                        )}
                      />
                      <Column
                        field="qty"
                        header="Total Units Sold"
                        body={(data) => <p>{data.qty.toLocaleString()}</p>}
                        sortable
                      />
                      <Column
                        field="price"
                        header="Total Profit"
                        body={(data) => <p>${data.price.toLocaleString()}</p>}
                        sortable
                      />
                      <Column header="Ordered By" body={OrderedByView} />
                    </DataTable>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </>
  );
}
