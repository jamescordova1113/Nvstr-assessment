import React from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import "./MarketOverview.css";

const CustomMarketValue = (props) => {
  const { pricePercentage } = props;

  const color =
    pricePercentage.toFixed(2) === "0.00"
      ? "grey"
      : pricePercentage > 0
      ? "red"
      : "green";
  const icon =
    pricePercentage.toFixed(2) === "0.00" ? (
      ""
    ) : pricePercentage > 0 ? (
      <FaLongArrowAltDown className="stock-overview__icon" />
    ) : (
      <FaLongArrowAltUp className="stock-overview__icon" />
    );
  const sign =
    pricePercentage.toFixed(2) === "0.00"
      ? ""
      : pricePercentage > 0
      ? "-"
      : "+";
  const percentageValue =
    pricePercentage >= 0 ? pricePercentage : -pricePercentage;

  return (
    <p style={{ color }}>
      {icon}
      {sign} {percentageValue.toFixed(2)}%
    </p>
  );
};

const MarketOverview = (props) => {
  const { securityPrice } = props;

  return (
    <div className="stock-overview">
      <p className="stock-overview__name">
        {securityPrice.name} ({securityPrice.symbol})
      </p>
      <CustomMarketValue
        pricePercentage={securityPrice.current_price_change_percent}
      />
    </div>
  );
};

export default MarketOverview;
