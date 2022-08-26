import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import styles from './style.module.css'



function Detail() {

  const {char_id} = useParams();
  const [char,setChar] = useState(null);
  const [comics,setComics] = useState([]);

  const [loading,setLoading] = useState(true);
  const [comicsLoading,setComicsLoading] = useState(true);

  console.log(char_id);



  

  useEffect(() => {
    axios(`https://gateway.marvel.com:443/v1/public/characters/${char_id}?apikey=7c204ff6f8b23fd65840be56de070c76`)
    .then((res) => res.data.data.results)
    .then((results) => setChar(results))
    .catch((error) => console.log(error))
    .finally(setLoading(false));
  },[char_id])




  useEffect(() => {
    axios(`https://gateway.marvel.com:443/v1/public/characters/${char_id}/comics?orderBy=onsaleDate&limit=10&apikey=7c204ff6f8b23fd65840be56de070c76`)
    .then((res) => res.data.data.results)
    .then((results) => setComics(results))
    .catch((error) => console.log(error))
    .finally(setComicsLoading(false));
  },[char_id])

  console.log(comics);


 return (
  <div className={styles.detail}>
   {loading && <Loading/>}
     
    {char&& (
      
      <div className={styles.detailBody}>
        <div>
          <img src={`${char[0].thumbnail.path}.${char[0].thumbnail.extension}`} alt={char[0].name}/>
        </div>

        <div>
          <h1>{char[0].name}</h1>
          <p>{char[0].description ? char[0].description : "There is no description" }</p>
        </div>

        <div>
          <h2>Comics</h2>
          {comics && (
            comics.map(item => (<div key={item.id}>{item.title}</div>))
          )}
        </div>
          
      
        {comicsLoading && <Loading/>}
      </div>

    
    )}

    

  </div>

)}






export default Detail