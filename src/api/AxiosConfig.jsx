import axios from "axios";

const performRequest = async (method, pathUrl, body, token) => {
  let endpoint = "https://paypm-backend.vercel.app/api/v1";
  const url = endpoint + pathUrl;

  const headers = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: token,
  };

  const res = await axios({
    method: method,
    url: url,
    data: body,
    headers: headers,
  });
  return res.data;
};

export default performRequest;
