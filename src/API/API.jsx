import axios from "axios";
import { useEffect, useState } from "react";

export function useCallAPI({ amount }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = (
          await axios.get(`https://opentdb.com/api.php?amount=${amount}`)
        ).data.results;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    callAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    dataForQuestion: data,
  };
}
