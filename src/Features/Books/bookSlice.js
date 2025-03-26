import api from "../../store/api";

const bookApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBooks: build.query({
            query: () => '/books',
            transformResponse: (response) => response.books,
            providesTags: ['Book'],
        }),
        getBook: build.query({
            query: (id) => '/books/' + id,
            transformResponse: (response) => response.book,
            providesTags: ['Book'],
        }),
        updateBook: build.mutation({
            query: ({ id, available }) => ({
                url: "/books/" + id,
                method: "PATCH",
                body: { available },
            }),
            transformResponse: (response) => response.book,
            invalidatesTags: ['Book'],
        })
    })
})

export const {
    useGetBooksQuery,
    useGetBookQuery,
    useUpdateBookMutation,
} = bookApi;

