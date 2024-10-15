import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
// import { useRouter } from "next/router";

const OnewaySearchResultsPage = () => {
  const searchParams = useSearchParams();
  console.log(searchParams);
  
  const router = useRouter();
  // const { data } = router.
  // console.log("data", data);

  return <div>OnewaySearchResultsPage</div>;
};

export default OnewaySearchResultsPage;
