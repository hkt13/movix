import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
 useEffect(() => {
  window.scrollTo(0,0)
 }, [location])
 

   const openMobileMenu=()=>{
    setMobileMenu(true)
    setShowSearch(false)
   }

  const openSearch=()=>{
    setMobileMenu(false)
    setShowSearch(true)
  }

   const searchHandler=(e)=>{
    if(e.key==="Enter"&&query.length>0){
      navigate(`search/${query}`);
      setTimeout(() => {
        setShowSearch(false)
      }, 1000);
    }
   
  

  }
  const navigationHandler=(e)=>{
      if(e.target.innerText&&e.target.tagName==="LI"){
        navigate(`/explore/${e.target.innerText}`) 
        setMobileMenu(false)   
      }

  }
const controlNavbar = ()=>{
// console.log(window.scrollY)
if (window.scrollY>200) {
  if(window.scrollY>lastScrollY&&!mobileMenu){
    setShow("hide")
  }
  else{
    setShow("show")
  }
}
else{
  setShow("top")
}

setLastScrollY(window.scrollY)
}

useEffect(() => {
  window.addEventListener("scroll",controlNavbar)

  return () => {
    window.removeEventListener("scroll", controlNavbar)
  }
}, [lastScrollY])

    return (
        <header className={`header ${mobileMenu && 'mobileView '} ${show}`}>
          <ContentWrapper>
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <ul className="menuItems" onClick={navigationHandler}>
              <li className="menuItem">Movies</li>
              <li className="menuItem">TvShows</li>
              <li className="menuItem searchIcon">
                <HiOutlineSearch onClick={openSearch}/>
              </li>
            </ul>
            <div className="mobileMenuItems">    
            <HiOutlineSearch onClick={openSearch}/>
              {!mobileMenu? (<SlMenu onClick={openMobileMenu}/>):(
                <VscChromeClose onClick={()=> setMobileMenu(false)}/>
              )}
            </div>
            
          </ContentWrapper>
           {showSearch && <div className="searchBar">
            <ContentWrapper>
               <div className="searchInput">
              <input 
            type="text"
            placeholder='Search for a movie or tvshow...'
            onChange={(e)=> setQuery(e.target.value)}
            onKeyUp={searchHandler}
            />
            <VscChromeClose onClick={()=>setShowSearch(false)}/>
            </div>
            </ContentWrapper>
           
            
          </div>}
        </header>
    );
};

export default Header;