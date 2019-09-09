
let Storage = function(props) {
let students;
  
  return {
    setStorage: function(props) {
      localStorage.setItem('students', JSON.stringify(props));
    },

    getStorage: function() {
      students = JSON.parse(localStorage.getItem('students'));
      return students;
    }
  }
}


export default Storage;
