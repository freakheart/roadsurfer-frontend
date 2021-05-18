import React, {useEffect} from "react";
import authProvider from "./authProvider";
import jwtProvider from "./jwtProvider";
import axios from "./axios";
import { Redirect, Route } from "react-router-dom";
import { HydraAdmin, ResourceGuesser, hydraDataProvider as baseHydraDataProvider, fetchHydra as baseFetchHydra } from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import { CustomLayout } from './theme/CustomLayout';
import { CustomTheme } from './theme/CustomTheme';
import ProductsList from "./resources/Products/ProductsList";
import OrdersList from "./resources/Orders/OrdersList";
import OrderItemsList from "./resources/OrderItems/OrderItemsList";
import StationsList from "./resources/Stations/StationsList";

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT+'/api';

const fetchHeaders = () => {
  return {
      Authorization: `Bearer ${jwtProvider.getToken()}`,
  }
}

const fetchHydra = (url, options = {}) => {
  return jwtProvider.getToken()
      ? baseFetchHydra(url, {
          ...options,
          headers: new Headers(fetchHeaders()),
      })
      : baseFetchHydra(url, options);
}

const apiDocumentationParser = (entrypoint) =>
    parseHydraDocumentation(
        entrypoint,
        jwtProvider.getToken()
            ? { headers: new Headers(fetchHeaders()) }
            : {}
    ).then(
        ({ api }) => ({ api }),
        (result) => {
            if (result.status === 401) {
                // Prevent infinite loop if the token is expired
                jwtProvider.ereaseToken()
                return Promise.resolve({
                    api: result.api,
                    customRoutes: [
                        <Route path="/" render={() => {
                            return jwtProvider.getToken() ? window.location.reload() : <Redirect to="/login" />
                        }} />
                    ],
                });
            }

            return Promise.reject(result);
        },
    );

const dataProvider = baseHydraDataProvider(entrypoint, fetchHydra, apiDocumentationParser);


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const setRestApiHeaders = (event) =>{
      const token = jwtProvider.getToken();
      if (event.key === 'auth' && token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else if (event.key === 'auth' && !token) {
          axios.defaults.headers.common['Authorization'] = null
      }
  }
  useEffect(()=>{
      const token = jwtProvider.getToken();
      if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      window.addEventListener('storage', setRestApiHeaders);
      return () =>{
          window.removeEventListener('storage', setRestApiHeaders);
      }
  },[])

  return(
    <HydraAdmin layout={CustomLayout} theme={CustomTheme} authProvider={ authProvider } dataProvider={ dataProvider } entrypoint={entrypoint}>
      <ResourceGuesser name="orders" list={OrdersList}/>
      <ResourceGuesser name="order_items" list={OrderItemsList}/>
      <ResourceGuesser name="stations" list={StationsList}/>
      <ResourceGuesser name="products" list={ProductsList}/>
     </HydraAdmin>
)};