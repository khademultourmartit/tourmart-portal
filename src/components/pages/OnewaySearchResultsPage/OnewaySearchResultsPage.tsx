
import { useRouter, useSearchParams } from "next/navigation";
import React from 'react'

const OnewaySearchResultsPage = () => {

  const searchParams = useSearchParams();
console.log(searchParams)



  return (
    <div>OnewaySearchResultsPage</div>
  )
}

export default OnewaySearchResultsPage