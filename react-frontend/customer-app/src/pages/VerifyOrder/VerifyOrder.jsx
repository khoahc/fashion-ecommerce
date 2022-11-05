import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as order from "../../services/order";
import VerifyOrderFail from "../../components/VerifyOrderFail";
import VerifyOrderSuccessfully from "../../components/VerifyOrderSuccessfully";
import NotifyVerifyOrder from "../NotifyVerifyOrder";

const VerifyOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);
  const [isSuccessfully, setIsSuccessfully] = useState(null);

  useEffect(() => {
    order
      .verifyOrder(code)
      .then((data) => {
        if (data.status === "OK") {
          setIsSuccessfully(true);
        } else {
          setIsSuccessfully(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [code]);

  console.log(isSuccessfully);
  return (
    <>
      {code === null ? (
        <NotifyVerifyOrder />
      ) : isSuccessfully === null ? (
        <div className="container min-height-100vh" />
      ) : isSuccessfully ? (
        <VerifyOrderSuccessfully />
      ) : (
        <VerifyOrderFail />
      )}
    </>
  );
};

export default VerifyOrder;
