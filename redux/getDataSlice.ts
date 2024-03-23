import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const getData = createApi({
  reducerPath: 'getDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com',
  }),
  endpoints: builder => ({
    getData: builder.query({
      query: () => ({
        url: 'products',
        method: 'get',
      }),
    }),
    getDataById: builder.query({
      query: id => ({
        url: `products/${id}`,
        method: 'get',
      }),
    }),
    deleteData: builder.mutation({
      query: id => ({
        url: `products/${id}`,
        method: 'delete',
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useGetDataByIdQuery,
  useDeleteDataMutation,
} = getData;
