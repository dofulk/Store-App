
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reduxStore from './redux/store'



function render(
  ui,
  {
    preloadedState,
    store = reduxStore,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }