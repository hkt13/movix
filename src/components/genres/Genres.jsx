import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
const Genres = ({ data }) => {
    const {genres} = useSelector(store=>store.home);
    // console.log(data)
  return (
    <div className="genres">
        {data?.map(g=>{
            if(!genres[g]) return;
               return(
                <div className="genre" key={g}>
                    {genres[g]}
                </div>
               )
        })}
    </div>
  )
}

export default Genres;