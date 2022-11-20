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
import numberWithDot from "../../utils/numberWithDot";

const Statis = () => {
  const listTitle = [
    {
      title: "Thống kê",
      link: "/statis",
    },
  ];

  const [chartOptionsWeek, setChartOptionsWeek] = useState({
    series: [
      {
        name: "Tuần trước",
        data: [40, 7, 20, 90, 36, 1],
      },
      {
        name: "Tuần này",
        data: [10, 30, 70, 80],
      },
    ],
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
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
          "CN",
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

  const [chartOptionsMonth, setChartOptionsMonth] = useState({
    series: [
      {
        name: "Tháng trước",
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
      },
      {
        name: "Tháng này",
        data: [110, 30, 70, 80, 40, 50, 40, 20, 51, 90, 91, 91, 32],
      },
    ],
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
    series: [
      {
        name: "Năm trước",
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
      },
      {
        name: "Năm nay",
        data: [110, 30, 70, 80, 40, 16, 40, 120, 51, 90, 91, 91, 32],
      },
    ],
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

  const [chooseRadio, setChooseRadio] = useState("week");

  useEffect(() => {
    document.title = "Quản lý thống kê";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <div>
          <div className="card-content">
            <div className="">
              <div className="flex justify-center gap-4 mb-6">
                <StatusCard title={"Tổng sản phẩm"} value={190} />
                <StatusCard title={"Tổng đơn hàng"} value={100} />
                <StatusCard
                  title={"Tổng doanh thu"}
                  value={numberWithDot(Number(1300000)) + " đ"}
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
                  onChange={(e) => {
                    console.log("value :>> ", e.target.value);
                    setChooseRadio(e.target.value)
                  }}
                  row
                >
                  <FormControlLabel
                    value="week"
                    control={<Radio />}
                    label="Tuần"
                  />
                  <FormControlLabel
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
                      chooseRadio === "week"
                        ? {
                            ...chartOptionsWeek.options,
                            theme: { mode: "light" },
                          }
                        : chooseRadio === "month"
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
                      chooseRadio === "week"
                        ? chartOptionsWeek.series
                        : chooseRadio === "month"
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
                    value={numberWithDot(Number(40000)) + " đ"}
                  />
                  <PriceStatisCard
                    title="Thấp nhất"
                    value={numberWithDot(Number(40000)) + " đ"}
                  />
                  <PriceStatisCard
                    title="Tổng doanh thu"
                    value={numberWithDot(Number(40000)) + " đ"}
                  />
                  <PriceStatisCard title="Hiệu suất" value="85%" />
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
