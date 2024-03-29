const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzQ2MzBmYjcyOGQxMmIzZWZlN2EwYWI5NDQ4ZDMzZCIsInN1YiI6IjY1MDk1OTNmM2NkMTJjMDE0ZWMwOWNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h2h89I26NAgWgnF9fVDzqIWsYp5T9R7pJgZyJNcbpBw";
const options = {
    method: "GET",
    headers:{
        'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + TMDB_TOKEN
    }
}

export const fetchDataFromApi = async(url,params)=>{
    const urlWithParams = new URL(BASE_URL + url);
    if(params){
        if(params){
            Object.keys(params).forEach(key => urlWithParams.searchParams.append(key, params[key]));

    }
    }
        try {
const response = await fetch(urlWithParams,options);
const data = await response.json();
return data;    
} catch (error) {
    console.log(error)
    return error;
}
}