import React, { useEffect, useState } from 'react'
import './style.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/IMG';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
  const {data, loading} = useFetch("/movie/upcoming");
  const [background, setBackground] = useState("");
  const url = useSelector(store=> store.home.url)

  useEffect(()=>{
      const bg = url.backdrop + data?.results[Math.floor(Math.random()*20)].backdrop_path;
      setBackground(bg);
  },[data])

  const searchHandler=(e)=>{
    if(e.key==="Enter"&&query.length>0){
      navigate(`search/${query}`);
    }
  }
  return (
    <div className="heroBanner">
     {!loading && <div className="backdrop-img">
        <Img src={background ? background:""}/>
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover.Explore Now.
          </span>
          <div className="searchInput">
            <input 
            type="text"
            placeholder='Search for a movie or tvshow...'
            onChange={(e)=> setQuery(e.target.value)}
            onKeyUp={searchHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
      
    </div>
  )
}

export default HeroBanner;