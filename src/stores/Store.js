import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
  posts: [],
  comments: []
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'post-comment':
      console.log(action)
      return {...state, comments: [...state.comments, action.newComment]}
    case 'set-comments':
      console.log(action)
      return {...state, comments: action.comments}
    case 'set-posts':
      return {...state, posts: action.posts}
    default:
      return state
    
  }
}

const StoreContext = createContext()


export const StoreProvider = ({children}) => {
  const contextValue = useReducer(reducer, initialState);

  return(
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );

}

export const useStore = () => {
  const contextValue = useContext(StoreContext);
  return contextValue;
}