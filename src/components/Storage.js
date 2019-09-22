import axios from "axios";

let Storage = function() {
  return {
    setValues(key, values) {
      localStorage.setItem(key, JSON.stringify(values));
    },

    getValues(key) {
      if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
        }
        return null;
    },

    getStudents() {
      return this.getValues('students')
    },

    setStudents(students) {
      return this.setValues('students', students)
    },

    getStudent(id) {
      return this.getStudents().find(student => student.id === id)
    },

    addStudent(student) {
      this.setStudents(this.getStudents.push(student))
    },

    updateStudent(student) {
      this.setStudents(this.getStudents.map(currentStudent => currentStudent.id === student.id ? student : currentStudent))
    },

    _getStudents() {
      axios.get('/api/profiles')
        .then((response) => {
          const students = response.data;
          this.setValues('students', students)
        })
        .catch((error) => {
          console.log(error);
        });
    },

    postStudents({id, name, lastName, email, sex, education, birthDate, universityAverageScore, mathScore, address, mobilePhone, skype, startDate}) {
      let memberProfile = {
        id: id,
        Name: name, 
        LastName: lastName, 
        Email: email, 
        Sex: sex, 
        Education: education, 
        BirthDate: birthDate, 
        UniversityAverageScore: universityAverageScore,
        MathScore: mathScore, 
        Address: address, 
        MobilePhone: mobilePhone, 
        Skype: skype, 
        StartDate: startDate
    };
      axios.post('/api/member-profile', {memberProfile})
    .then((response) => {
      const students = response.data;
      this.setValues('students', students)
    })
    .catch((error) => {
        console.log(error);
    });
    },

    deleteStudent(props) {
      axios.delete({
        url: `/api/member-profile/${props.id}`,
      })
     },

    editStudent({id, name, lastName, email, sex, education, birthDate, universityAverageScore, mathScore, address, mobilePhone, skype, startDate}) {
      let memberProfile = {
        id: id,
        Name: name, 
        LastName: lastName, 
        Email: email, 
        Sex: sex, 
        Education: education, 
        BirthDate: birthDate, 
        UniversityAverageScore: universityAverageScore,
        MathScore: mathScore, 
        Address: address, 
        MobilePhone: mobilePhone, 
        Skype: skype, 
        StartDate: startDate
    };
      axios.put({
        method:'post',
        url: `/api/member-profile/${id}`,
        data: { memberProfile }
      })
        .then((response) => {
          const student = response.data
          return student;
      });
      },

    getStudentProgress(props) {
    axios.get(`/api/user-progress/${props.id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },


    getStudentTasks(props) {
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
