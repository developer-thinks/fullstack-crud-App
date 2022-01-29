import {useEffect, useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [updateReview, setUpdateReview] = useState("");

  useEffect(()=>{
    Axios.get('http://localhost:5000/api/get')
    .then((res)=>{
      setMovieList(res.data);
      // console.log(res.data);
    } )
  },[movieList])


  const submitForm = ()=>{
    // console.log(movieName, movieReview);
    Axios.post('http://localhost:5000/api/insert',{
      movieName : movieName,
      movieReview : movieReview
    });
    setMovieList([...movieList, {movieName, movieReview}])
  }

  const deleteMovie = (deleteMovie) =>{
    Axios.delete(`http://localhost:5000/api/delete/${deleteMovie}`);
  }


  const updateMovieReview = (movieToUpdate) =>{
    // console.log(updateReview);
    Axios.put('http://localhost:5000/api/update',{
      updateReview : updateReview,
      oldMovie : movieToUpdate
    });

    setUpdateReview("");
  }

  return (
    <div className="App">
      <h1>Crud Application : </h1>
        <div className="form">

          <label> Movie Name : </label>
          <input type="text" name="moviename" value={movieName} onChange={(e)=> setMovieName(e.target.value)} required />

          <label> Review : </label>
          <input type="text" name="review" value={movieReview} onChange={(e)=> setMovieReview(e.target.value)} />

          <button onClick={submitForm} className='btn' > Submit</button>

          {movieList.map((movie,id)=>{
            return (
              <div className='card-header' >
                <div className="card">
                  <h1> {movie.movieName} </h1>
                  <p>{movie.movieReview}</p>
                </div>
                <div className='listInput'>
                  <button onClick={()=> {deleteMovie(movie.movieName)}} className='deletebtn'  > Delete </button>
                  <input type="text" value={updateReview} onChange={(e)=> setUpdateReview(e.target.value)}  />
                  <button onClick={()=> {updateMovieReview(movie.movieName)} } className='btn-update' > update </button>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  );
}

export default App;
