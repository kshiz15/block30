import api from "../../store/api";

const reservationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReservations: build.query({
      query: () => "/reservations",
      transformResponse: (response) => response.reservation,
      providesTags: ["Book"],
    }),
    deleteReservation: build.mutation({
      query: (id) => ({
        url: "/reservations/" + id,
        method: "DELETE",
      }),
      transformResponse: (response) => response.deletedReservation,
      invalidatesTags: ["Book"],
    }),
  }),
});

export const { useGetReservationsQuery, useDeleteReservationMutation } =
  reservationApi;
