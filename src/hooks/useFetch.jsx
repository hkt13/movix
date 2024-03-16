import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
   useEffect(() => {
    setLoading("Loading");
    setData(null)
    fetchDataFromApi(url).then(res => {
        setLoading(false)
        setData(res)
        });
   }, [url])
  return {data, loading};
};

export default useFetch;
