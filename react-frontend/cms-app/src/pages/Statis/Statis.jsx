import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import PriceStatisCard from "../../components/PriceStatisCard/PriceStatisCard";

import StatusCard from "../../components/StatisCard/StatisCard";
import Titlebar from "../../components/Titlebar";
import {
  getQuantityProduct,
  getQuantityOrder,
  getRevenueOfMonth,
  getRevenueOfYear,
  getTotalRevenue,
} from "../../services/axios/statisticApi";
import numberWithDot from "../../utils/numberWithDot";

const Statis = () => {
  const listTitle = [
    {
      title: "Thống kê",
    },
  ];
  const currentTime = new Date();

  // returns the month (from 0 to 11)
  const month = currentTime.getMonth() + 1;
  // returns the year (four digits)
  var year = currentTime.getFullYear();

  const [dataChart, setDataChart] = useState([]);
  const [dataChartPrev, setDataChartPrev] = useState([]);

  const [maxRevenue, setMaxRevenue] = useState(0);
  const [minRevenue, setMinRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [quantityOrder, setQuantityOrder] = useState(0);
  const [totalAllRevenue, setTotalAllRevenue] = useState(0);

  const [chartOptionsMonth, setChartOptionsMonth] = useState({
    series: [],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Ngày 1",
          "Ngày 2",
          "Ngày 3",
          "Ngày 4",
          "Ngày 5",
          "Ngày 6",
          "Ngày 7",
          "Ngày 8",
          "Ngày 9",
          "Ngày 10",
          "Ngày 11",
          "Ngày 12",
          "Ngày 13",
          "Ngày 14",
          "Ngày 15",
          "Ngày 16",
          "Ngày 17",
          "Ngày 18",
          "Ngày 19",
          "Ngày 20",
          "Ngày 21",
          "Ngày 22",
          "Ngày 23",
          "Ngày 24",
          "Ngày 25",
          "Ngày 26",
          "Ngày 27",
          "Ngày 28",
          "Ngày 29",
          "Ngày 30",
          "Ngày 31",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  });

  const [chartOptionsYear, setChartOptionsYear] = useState({
    series: [],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  });

  const handleChooseTypeStatistic = (e) => {
    setChooseRadio(e.target.value);
    let dataChartTmp = [];
    let dataChartPrevTmp = [];
    let totalRevenueCurrent = 0;
    let totalRevenuePrev = 0;
    switch (e.target.value) {
      case "year":
        Promise.all([
          getRevenueOfYear(year)
            .then((data) => {
              if (data.status === "OK") {
                let value = [];
                data.data.map((item, index) => {
                  value.push(item.value);
                });
                dataChartTmp = value;
                setMaxRevenue(value.reduce((a, b) => Math.max(a, b), 0));
                setMinRevenue(value.reduce((a, b) => Math.min(a, b), 0));
                setTotalRevenue(value.reduce((a, b) => a + b));
                totalRevenueCurrent = value.reduce((a, b) => a + b);
                setDataChart(value);
              } else {
                return Promise.reject(new Error(data.message));
              }
            })
            .catch((error) => {
              console.log("error :>> ", error);
            }),
          getRevenueOfYear(year - 1)
            .then((data) => {
              // console.log('data.status :>> ', data.status);
              if (data.status === "OK") {
                let value = [];
                data.data.map((item, index) => {
                  value.push(item.value);
                });
                dataChartPrevTmp = value;
                setDataChartPrev(value);

                totalRevenuePrev =
                  value.reduce((a, b) => a + b) === 0
                    ? 1
                    : value.reduce((a, b) => a + b);
                setEfficiency((totalRevenueCurrent / totalRevenuePrev) * 100);
                setChartOptionsYear((prev) => ({
                  ...prev,
                  series: [
                    {
                      name: "Năm trước",
                      data: dataChartPrevTmp,
                    },
                    {
                      name: "Năm nay",
                      data: dataChartTmp,
                    },
                  ],
                }));
              } else {
                return Promise.reject(new Error(data.message));
              }
            })
            .catch((error) => {
              console.log("error :>> ", error);
            }),
        ]);
        break;
      case "month":
        Promise.all([
          getRevenueOfMonth(month, year)
            .then((data) => {
              if (data.status === "OK") {
                let value = [];
                data.data.map((item) => {
                  value.push(item.value);
                });
                dataChartTmp = value;
                setMaxRevenue(value.reduce((a, b) => Math.max(a, b), 0));
                setMinRevenue(value.reduce((a, b) => Math.min(a, b), 0));
                setTotalRevenue(value.reduce((a, b) => a + b));
                totalRevenueCurrent = value.reduce((a, b) => a + b);
                setDataChart(value);
              } else {
                return Promise.reject(new Error(data.message));
              }
            })
            .catch((error) => {
              console.log("error :>> ", error);
            }),
          getRevenueOfMonth((month === 1 ? 12 : month - 1), (month === 1 ? year - 1 : year))
            .then((data) => {
              // console.log('data.status :>> ', data.status);
              if (data.status === "OK") {
                let value = [];
                data.data.map((item, index) => {
                  value.push(item.value);
                });
                dataChartPrevTmp = value;
                setDataChartPrev(value);

                totalRevenuePrev =
                  value.reduce((a, b) => a + b) === 0
                    ? 1
                    : value.reduce((a, b) => a + b);
                setEfficiency((totalRevenueCurrent / totalRevenuePrev) * 100);
                setChartOptionsMonth((prev) => ({
                  ...prev,
                  series: [
                    {
                      name: "Tháng trước",
                      data: dataChartPrevTmp,
                    },
                    {
                      name: "Tháng này",
                      data: dataChartTmp,
                    },
                  ],
                }));
              } else {
                return Promise.reject(new Error(data.message));
              }
            })
            .catch((error) => {
              console.log("error :>> ", error);
            }),
        ]);
        break;

      default:
        break;
    }
  };
  const [chooseRadio, setChooseRadio] = useState("month");

  useEffect(() => {
    document.title = "Quản lý thống kê";
    let dataChartTmp = [];
    let dataChartPrevTmp = [];
    let totalRevenueCurrent = 0;
    let totalRevenuePrev = 0;
    Promise.all([
      getRevenueOfMonth(month, year)
        .then((data) => {
          if (data.status === "OK") {
            let value = [];
            data.data.map((item) => {
              value.push(item.value);
            });
            dataChartTmp = value;
            setMaxRevenue(value.reduce((a, b) => Math.max(a, b), 0));
            setMinRevenue(value.reduce((a, b) => Math.min(a, b), 0));
            setTotalRevenue(value.reduce((a, b) => a + b));
            totalRevenueCurrent = value.reduce((a, b) => a + b);
            setDataChart(value);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
        }),
      getRevenueOfMonth((month === 1 ? 12 : month - 1), (month === 1 ? year - 1 : year))
        .then((data) => {
          // console.log('data.status :>> ', data.status);
          if (data.status === "OK") {
            let value = [];
            data.data.map((item, index) => {
              value.push(item.value);
            });
            dataChartPrevTmp = value;
            setDataChartPrev(value);

            totalRevenuePrev =
              value.reduce((a, b) => a + b) === 0
                ? 1
                : value.reduce((a, b) => a + b);
            setEfficiency((totalRevenueCurrent / totalRevenuePrev) * 100);
            setChartOptionsMonth((prev) => ({
              ...prev,
              series: [
                {
                  name: "Tháng trước",
                  data: dataChartPrevTmp,
                },
                {
                  name: "Tháng này",
                  data: dataChartTmp,
                },
              ],
            }));
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
        }),

      getQuantityProduct()
        .then((data) => {
          if (data.status === "OK") {
            setQuantityProduct(data.data);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
        }),

      getQuantityOrder()
        .then((data) => {
          if (data.status === "OK") {
            setQuantityOrder(data.data);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
        }),

      getTotalRevenue()
        .then((data) => {
          if (data.status === "OK") {
            setTotalAllRevenue(data.data);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
        }),
    ]);
  }, []);

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <div>
          <div className="card-content">
            <div className="">
              <div className="flex justify-center gap-4 mb-6">
                <StatusCard title={"Tổng sản phẩm"} value={quantityProduct} />
                <StatusCard title={"Tổng đơn hàng"} value={quantityOrder} />
                <StatusCard
                  title={"Tổng doanh thu"}
                  value={numberWithDot(Number(totalAllRevenue)) + " đ"}
                />
              </div>
            </div>

            <div className="flex flex-col card p-8 justify-center items-stretch">
              <h1 className="uppercase font-bold text-xl tracking-wide mb-4">
                Biểu đồ doanh thu
              </h1>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Thống kê theo
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="week"
                  name="radio-buttons-group"
                  onChange={handleChooseTypeStatistic}
                  row
                >
                  <FormControlLabel
                    checked={chooseRadio === "month"}
                    value="month"
                    control={<Radio />}
                    label="Tháng"
                  />
                  <FormControlLabel
                    value="year"
                    control={<Radio />}
                    label="Năm"
                  />
                </RadioGroup>
              </FormControl>

              <div className="flex flex-row">
                <div className="h-auto w-[70%]">
                  {/* chart */}
                  <Chart
                    options={
                      chooseRadio === "month"
                        ? {
                            ...chartOptionsMonth.options,
                            theme: { mode: "light" },
                          }
                        : {
                            ...chartOptionsYear.options,
                            theme: { mode: "light" },
                          }
                    }
                    series={
                      chooseRadio === "month"
                        ? chartOptionsMonth.series
                        : chartOptionsYear.series
                    }
                    type="line"
                    height="100%"
                  />
                </div>

                <div className="flex flex-col ">
                  <PriceStatisCard
                    title="Cao nhất"
                    value={numberWithDot(Number(maxRevenue)) + " đ"}
                  />
                  <PriceStatisCard
                    title="Thấp nhất"
                    value={numberWithDot(Number(minRevenue)) + " đ"}
                  />
                  <PriceStatisCard
                    title="Tổng doanh thu"
                    value={numberWithDot(Number(totalRevenue)) + " đ"}
                  />
                  <PriceStatisCard
                    title="Hiệu suất"
                    value={efficiency.toFixed(2) + " %"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statis;
