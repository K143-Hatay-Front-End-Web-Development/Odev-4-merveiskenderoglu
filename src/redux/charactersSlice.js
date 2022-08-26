import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const character_limit = 30;

export const fetchCharacters = createAsyncThunk('characters/getCharacters', async(page) => {
    const res = await axios(`https://gateway.marvel.com:443/v1/public/characters?limit=${character_limit}&offset=${page*character_limit}&apikey=7c204ff6f8b23fd65840be56de070c76`);
    return res.data.data.results;
})

// export const fetchCharacters = createAsyncThunk('characters/getCharacters', async(page) => {
//     const res = await axios(`https://www.breakingbadapi.com/api/characters?limit=${character_limit}&offset=${page*character_limit}`);
//     return res.data;
// })




export const charactersSlice = createSlice({
    name : 'characters',
    initialState : {
        items : [],
        status: "idle",
        error : null,
        page :0,
        hasNextPage:true,
        scroollLoad : false,
    },
    reducers :  {
        loadMore : (state,action) => {
            state.scroollLoad = true;
        }
    },
    extraReducers : {
        [fetchCharacters.fulfilled] : (state,action) => {
            state.items =[...state.items,...action.payload];
            state.status = "succeeded";
            state.page += 1;
            state.scroollLoad = false;

            if(action.payload.length <30){
                state.hasNextPage = false;
            }
        },
        [fetchCharacters.rejected] : (state,action) => {
            state.status="failed";
            state.error = action.error.message;
        },
        [fetchCharacters.pending] : (state,action) => {
            state.status = "loading";
        }
    }
});


export const {loadMore} = charactersSlice.actions;
export default charactersSlice.reducer;