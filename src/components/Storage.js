import axios from "axios";



let Storage = function(props) {
let students;
  
  return {
    setStorage: function(props) {
      localStorage.setItem('students', JSON.stringify(props));
    },

    getStorage: function() {
      students = JSON.parse(localStorage.getItem('students'));
      return students;
    },

    getStudentsAxios: () => {
    axios.get('/api/profiles')
      .then((response) => {
        students = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },

    postStudentsAxios: (props) => {
      axios.post('/api/member-profile', {
        Name: props.name, 
        LastName: props.lastName, 
        Email: props.email, 
        Sex: props.swx, 
        Education: props.eduction, 
        BirthDate: props.birthDate, 
        UniversityAverageScore: props.universityAverageScore,
        MathScore: props.mathScore, 
        Address: props.address, 
        MobilePhone: props.mobilePhone, 
        Skype: props.skype, 
        StartDate: props.startDate
        
    })
    .then((response) => {
      students = response.data;
    })
    .catch((error) => {
        console.log(error);
    });
    },

    deleteStudentsAxios: (props) => {
      axios.delete({
        url: `/api/member-profile/${props.id}`,
      })
        .then((response) => {
        students = response.data
      });
      },

    editStudentsAxios: (props) => {
      axios.put({
        method:'post',
        url: `/api/member-profile/${props.id}`,
        data: {
          Name: props.name, 
          LastName: props.lastName, 
          Email: props.email, 
          Sex: props.swx, 
          Education: props.eduction, 
          BirthDate: props.birthDate, 
          UniversityAverageScore: props.universityAverageScore,
          MathScore: props.mathScore, 
          Address: props.address, 
          MobilePhone: props.mobilePhone, 
          Skype: props.skype, 
          StartDate: props.startDate
        }
      })
        .then((response) => {
        students = response.data
      });
      },

    getStudentProgressAxios: (props) => {
    axios.get(`/api/user-progress/${props.id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },


    getStudentTasksAxios: (props) => {
      axios.get(`/api/member-profile/tasks/${props.id}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      },
  }
}




export default Storage;
