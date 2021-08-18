const initialState = {
    reviewsVezeeta: []
  };
  
  function rootReducer(state = initialState, action) {
      switch(action.type){
          case 'GET_REVIEWS_VEZEETA':
              return Object.assign({},state,{
                reviewsVezeeta: action.payload
              })
          default:
            return state;
      }
    
  };
  
  export default rootReducer;