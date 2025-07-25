


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // <-- THIS IS REQUIRED for sending cookies
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Product", "Order"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
