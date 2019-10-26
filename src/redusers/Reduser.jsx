import { combineReducers } from 'redux';

 const studentsReduser = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ALL_USERS': 
            return state.concat(action.students);
        case 'ADD_USER': 
            return [...state, action.student];
        case 'DEL_USER': 
            return state.filter((item) => item.id !== action.studentId);
        case 'EDIT_USER': 
            return state.map(item => {
              if(item.id === action.updatedStudent.id) 
                {item = action.updatedStudent}
                 return item;
              });
        default: return state;
    }
}


const reducers = combineReducers({
  studentsState: studentsReduser,

});

export default reducers;
