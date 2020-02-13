const initialState={
    age:0
};

const Reducer = (state=initialState,action)=>{
   // const newState = state;
 
 
    switch(action.type)
    {
        case 'Increase_Age':
            return { age:action.b}
        case 'Decrease_Age':
            return { age:state.age -1}
    }
        return state
}

export default Reducer;
