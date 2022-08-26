import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/charactersSlice';
import styles from './style.module.css'
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useNavigate } from 'react-router-dom';
import {loadMore} from '../../redux/charactersSlice'


const Home = () => {

    const characters = useSelector((state) => state.characters.items);
    const page = useSelector((state) => state.characters.page);
    const hasNextPage = useSelector((state) => state.characters.hasNextPage);
    const error = useSelector((state) => state.characters.error);
    const status = useSelector((state) => state.characters.status);
    const scroollLoad = useSelector((state) => state.characters.scroollLoad);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchCharacters());
        }
    },[status,dispatch])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);



    function handleScroll() {
        if ((window.innerHeight + document.documentElement.scrollTop) +1 !== document.documentElement.offsetHeight) {
            console.log("scroll")
            console.log("innerHeight" , window.innerHeight);
            console.log("scrolltop",document.documentElement.scrollTop);
            console.log("offset",document.documentElement.offsetHeight);
            console.log("windowscrollY", window.scrollY)
            return;
        }
        
        
            

        dispatch(loadMore());
        console.log("load")
    }

    useEffect(() => {
      if(scroollLoad && status === "succeeded" && hasNextPage){
          dispatch(fetchCharacters(page));
          console.log("scroll")
          console.log(page)

      }
  },[scroollLoad,dispatch,status,page])

    if(status === "failed"){
        return <Error message={error} />
    }

  return (
    
    <div className={styles.container}>

        {characters.map((character,index) => (
            <div className = {styles.card} onClick={() => (navigate(`/char/${character.id}`))}key={character.id}>
                <div className={styles.cardImage}>
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                </div>
                <h3>{character.name}</h3>     
            </div>
        ))}

        <div style={{padding:"35px",textAlign:"center" , color: "black" , height:"100vh"}}>
            {status ==="loading" && <Loading/>}
        </div>
        
    </div>
  )
}

export default Home;