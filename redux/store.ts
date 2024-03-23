import { configureStore } from '@reduxjs/toolkit'
import { getData } from './getDataSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer:{
      [getData.reducerPath] : getData.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: false
        }).concat(getData.middleware)
    }
})

setupListeners(store.dispatch)