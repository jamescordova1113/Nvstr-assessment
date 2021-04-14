import React, { useEffect, useState } from "react";
import MarketOverview from "components/market/MarketOverview";
import Loading from "components/loading/Loading";
import { ServerMock } from "utils/ServerMock";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import "./PortfolioSummary.css";

const CustomDayChange = (props) => {
	const { diffValue, diffPercentage } = props;

	const color = diffValue > 0 ? "red" : "green";
	const sign = diffValue > 0 ? "-" : "+";
	const icon = diffValue > 0 ?
		<FaLongArrowAltDown className="portfolio-day-change__icon" />
		: <FaLongArrowAltUp className="portfolio-day-change__icon" />;
	const value = diffValue > 0 ? diffValue : -diffValue;
	const percent = diffPercentage > 0 ? diffPercentage : -diffPercentage;

	return (
		<div className="portfolio-day-change" style={{ color }}>
			{icon}
			<div>
				<p>{sign} ${value}</p>
				<p>{sign} {percent}%</p>
			</div>
		</div>
	)
}

const PortfolioSummary = () => {
	const [portfolioValue, setPortfolioValue] = useState(0);
	const [diffValue, setDiffValue] = useState(0);
	const [diffPercentage, setDiffPercentage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [securityPrices, setSecurityPrices] = useState(false);

	useEffect(() => {
		ServerMock.getAllSecurities()
			.then((res) => {
				const responseValue = res.data;
				let arrayId = [];

				for (let index = 0; index < responseValue.length; index++) {
					arrayId.push(responseValue[index].id);
				}

				getSecurityPrices(arrayId);
			})
			.catch((err) => {
				console.log(err);
			})
	}, []);

	const getSecurityPrices = (arrayId) => {
		ServerMock.getSecurityPrices(arrayId)
			.then((response) => {
				const responseValue = response.data;

				console.log(responseValue);
				setSecurityPrices(responseValue);
				let portValSum = 0;
				let portDifSum = 0;

				Object.keys(responseValue).forEach((index) => {
					portValSum += responseValue[index].current_price;
					portDifSum += responseValue[index].current_price_change;
				})

				setPortfolioValue(portValSum.toFixed(2));
				setDiffValue(portDifSum.toFixed(2));
				setDiffPercentage((portDifSum / portValSum).toFixed(2));

				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err)
			})
	};

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="portfolio-summary-container">
			<div className="portfolio">
				<div className="portfolio-value">
					<p className="portfolio-value__title">Portfolio Value</p>
					<p className="portfolio-value__number">${portfolioValue}</p>
				</div>
				<CustomDayChange diffValue={diffValue} diffPercentage={diffPercentage} />
			</div>
			<div className="stock">
				<MarketOverview securityPrice={securityPrices[5]} />
				<MarketOverview securityPrice={securityPrices[6]} />
			</div>
		</div>
	);
}

export default PortfolioSummary;
