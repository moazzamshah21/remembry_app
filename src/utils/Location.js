// import RestClient from "../services/RestClient";
// import { GOOGLE_API_KEY } from "../utils/Config";

// const GetCurrentLocationAddress = async (lat, long) => {
//     var response = await RestClient.Get(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${long}&key=${GOOGLE_API_KEY}&language=en`);
//     if (response.status == "OK") {
//         if (response.results.length > 0) {
//             return response.results[0].formatted_address
//         }
//     } else {
//         return "";
//     }
// }
// const GetAutocompleteSearch = async (inputText) => {
//     var response = await RestClient.Get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${inputText}&language=en&components=country:us`);
//     if (response.status == "OK") {
//         return response.predictions
//     } else {
//         return "";
//     }
// }

// const GetSelectedAddressLatLog = async (place_id) => {
//     var response = await RestClient.Get(`https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&place_id=${place_id}&language=en`);
//     if (response.status == "OK") {
//         return response.result  
//     } else {
//         return "";
//     }
// }

// export default { GetCurrentLocationAddress, GetAutocompleteSearch, GetSelectedAddressLatLog };



import RestClient from "../services/RestClient";
import { GOOGLE_API_KEY } from "../utils/Config";

const GetCurrentLocationAddress = async (lat, long) => {
  try {
    const response = await RestClient.Get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}&language=en`
    );

    if (response.status === "OK" && response.results.length > 0) {
      return response.results[0].formatted_address;
    } else {
      console.warn("Geocode failed:", response.status);
      return "";
    }
  } catch (error) {
    console.error("Error in GetCurrentLocationAddress:", error);
    return "";
  }
};

const GetAutocompleteSearch = async (inputText) => {
  const response = await RestClient.Get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${inputText}&language=en&components=country:us`
  );
  if (response.status === "OK") {
    return response.predictions;
  } else {
    return "";
  }
};

const GetSelectedAddressLatLog = async (place_id) => {
  const response = await RestClient.Get(
    `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&place_id=${place_id}&language=en`
  );
  if (response.status === "OK") {
    return response.result;
  } else {
    return "";
  }
};

export default { GetCurrentLocationAddress, GetAutocompleteSearch, GetSelectedAddressLatLog };
