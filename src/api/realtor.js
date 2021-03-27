import axios from "axios";
// import { useDataLayerValue } from "../DataLayer";

// const [{}, dispatch] = useDataLayerValue();
const apiKey = "80e5e06efamsh3721e5506312e5bp154b12jsn1037ae2aee63";

// Bottom left :49.200255, -123.219011
// top right: 49.297520, -123.023318

// const setCity = (city) => {

//     switch(city) {
//         case "Vancouver":

//     }
// }

const options = {
  method: "GET",
  url:
    "https://realtor-canadian-real-estate.p.rapidapi.com/properties/list-residential",
  params: {
    CurrentPage: "1",
    LatitudeMin: "-22.26872153207163",
    LongitudeMax: "-10.267941690981388",
    RecordsPerPage: "10",
    LongitudeMin: "-136.83037765324116",
    LatitudeMax: "81.14747595814636",
    BedRange: "0-0",
    BathRange: "0-0",
    NumberOfDays: "0",
    CultureId: "1",
    PriceMin: "0",
    SortBy: "1",
    SortOrder: "A",
    RentMin: "0",
  },
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "realtor-canadian-real-estate.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    // console.log(response.data.results);
    // data(response.data.Results);
    // dispatch({
    //   type: "SET_ADDRESS",
    //   address: response,
    // });
  })
  .catch(function (error) {
    console.error(error);
  });

// export const data = () => {
//   return 0;
// };

// export default data;
