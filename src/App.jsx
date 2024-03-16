import { useState, useEffect } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfig, getGenres } from './store/HomeSlice';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function AppLayout() {
const dispatch = useDispatch();

const fetchApiConfig=()=>{
  fetchDataFromApi("/configuration").then(res=>{
    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
    }
    
  dispatch(getApiConfig(url))
  });
}

const getGenereData=async()=>{
const promises=[];
const genres = ["tv","movie"];
const allGenres = {};
genres.forEach(item=>{
  promises.push(fetchDataFromApi(`/genre/${item}/list`))
})

let data = await Promise.all(promises)
data.map(({ genres } )=>{
return genres.map((item)=>{
  allGenres[item.id]=item.name;
})
})
dispatch(getGenres(allGenres))

}

useEffect(() => {
fetchApiConfig();
getGenereData();
}, [])

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <AppLayout/>,
    children: [
      {
        path:'/',
        element: <Home/>
      },
      {
        path: '/:mediaType/:id',
        element: <Details/>
      },
      {
        path: '/search/:query',
        element: <SearchResult/>
      },
      {
        path: '/explore/:mediaType',
        element: <Explore/>
      },
      {
        path: '*',
        element: <PageNotFound/>
      }
    ]
  },
  
  ]);

