import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AirlinesSlider from "../AirlinesSlider/AirlinesSlider";

const OnewaySearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [airlineData, setAirLineData] = useState([]);

  useEffect(() => {
    const results = localStorage.getItem("flightSearchResults");
    if (results) {
      const parsedResults = JSON.parse(results);
      const airLinesData = parsedResults.map((data: any) => ({
        validatingCarrier: data?.flightOffer?.validatingCarrier,
        totalFare: data?.flightOffer?.pricingInfo?.price?.totalFare,
      }));
      setAirLineData(airLinesData);
      setSearchResults(parsedResults);
    }
  }, []);

  return (
    <Box>
      <Typography>One Way search Result</Typography>
      <AirlinesSlider {...{ airlineData }} />
      {searchResults && searchResults.length > 0 ? (
        <Box>
          {searchResults?.map((data) => (
            <h1>{data?.flightOffer?.offerId}</h1>
          ))}
        </Box>
      ) : (
        <Typography>No search results available.</Typography>
      )}
    </Box>
  );
};

export default OnewaySearchResultsPage;
