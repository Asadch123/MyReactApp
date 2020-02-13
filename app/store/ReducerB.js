const initialState={
    numbers:0
};

const ReducerB = (state=initialState,action)=>{
   // const newState = state;
 
 
    switch(action.type)
    {
        case 'increaseNumbers':
            return { numbers:state.numbers +1}
        case 'decreaseNumbers':
            return { numbers:state.numbers -1}
    }
        return state
}

export default ReducerB;
