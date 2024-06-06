import React, { useReducer , createContext } from 'react'

export const StateContext = createContext()
const initialState = {
    movies: [],
    genres : []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.payload
                
            }
            case 'SET_GENRES':
                return {
                    ...state,
                    genres: action.payload
                }
        default:
            return state
    }
}
export const StateProvider = (props)=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {props.children}
        </StateContext.Provider>
    )
}

