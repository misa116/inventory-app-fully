 import apiSlice from "./apiSlice";
import { ORDERS_URL } from "./constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/create`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/updatestock`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrderProcur: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/deliver-dept/${orderId}`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),

     updateOrderRecieved: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/receive`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),


   deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 5,
    }),

    
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useDeliverOrderProcurMutation,
  useUpdateOrderRecievedMutation,
  useDeleteOrderMutation,
} = orderApiSlice;