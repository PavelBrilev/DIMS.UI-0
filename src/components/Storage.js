import axios from "axios";

let Storage = function() {
  return {
    getValues(key) {
      return localStorage.hasOwnProperty(key) ? JSON.parse(localStorage.getItem(key)) : null
    },

    setValues(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    getArrayId (data) {
      return (data && data.length ? data[data.length - 1].id : 0) + 1
    },

    getElementIndexById (data, id) {
      return data.findIndex(item => item.id === id)
    },

    getStudents() {
      return this.getValues('students')
    },

    setStudents(students) {
      this.setValues('students', students)
    },

    getStudent(id) {
      const students = this.getStudents()

      return students ? students.find(student => student.id === id) : null
    },

    saveStudent (student) {
      if (student.id) {
        this.updateStudent(student)
      } else {
        this.addStudent(student)
      }
    },

    addStudent (student) {
      const students = this.getStudents() || []

      student.id = this.getArrayId(students)
      students.push(student)

      this.setStudents(students)
    },

    updateStudent (student) {
      const students = this.getStudents()
      const index = this.getElementIndexById(students, student.id)

      students[index] = student;
      this.setStudents(students)
    },

    deleteStudent (studentId) {
      const students = this.getStudents();
      const index = this.getElementIndexById(students, studentId);

      students.splice(index, 1);
      this.setStudents(students);
    },

    getTasks() {
      return this.getValues('tasks')
    },

    setTasks(tasks) {
      this.setValues('tasks', tasks)
    },

    getTask(id) {
      const tasks = this.getTasks()

      return tasks ? tasks.find(task => task.id === id) : null
    },

    saveTask (task) {
      if (task.id) {
        this.updateTask(task);
      } else {
        this.addTask(task)
      }
    },

    addTask (task) {
      const tasks = this.getTasks() || []

      task.id = this.getArrayId(tasks)
      tasks.push(task)

      this.setTasks(tasks)
    },

    updateTask (task) {
      const tasks = this.getTasks()
      const index = this.getElementIndexById(tasks, task.id)

      tasks[index] = task;
      this.setTasks(tasks)
    },

    deleteTasks (taskId) {
      const tasks = this.getTasks();
      const index = this.getElementIndexById(tasks, taskId);

      tasks.splice(index, 1);
      this.setTasks(tasks);
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

    __deleteStudent(props) {
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
