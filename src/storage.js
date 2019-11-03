import axios from 'axios';

export const Roles = {
  MENTOR: 'mentor',
  ADMIN: 'admin',
  USER: 'student',
};

class Storage {
  getValues(key) {
    return localStorage.hasOwnProperty(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  }

  setValues(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getArrayId(data) {
    return (data && data.length ? data[data.length - 1].id : 0) + 1;
  }

  getElementIndexById(data, id) {
    return data.findIndex((item) => item.id === id);
  }

  getStudentsLocal() {
    return this.getValues('students');
  }

  setStudents(students) {
    this.setValues('students', students);
  }

  getStudentLocal(id) {
    const students = this.getStudents();

    return students ? students.find((student) => student.id === id) : null;
  }

  saveStudent(student) {
    if (student.id) {
      this.updateStudent(student);
    } else {
      this.addStudent(student);
    }
  }

  addStudentLocal(student) {
    const students = this.getStudents() || [];

    student.id = this.getArrayId(students);
    students.push(student);

    this.setStudents(students);
  }

  updateStudent(student) {
    const students = this.getStudents();
    const index = this.getElementIndexById(students, student.id);

    students[index] = student;
    this.setStudents(students);
  }

  deleteStudent(studentId) {
    const students = this.getStudents();
    const index = this.getElementIndexById(students, studentId);

    students.splice(index, 1);
    this.setStudents(students);
  }

  getTasksLocal() {
    return this.getValues('tasks');
  }

  setTasks(tasks) {
    this.setValues('tasks', tasks);
  }

  getTask(id) {
    const tasks = this.getTasks();

    return tasks ? tasks.find((task) => task.id === id) : null;
  }

  saveTask(task) {
    if (task.id) {
      this.updateTask(task);
    } else {
      this.addTask(task);
    }
  }

  addTask(task) {
    const tasks = this.getTasks() || [];

    task.id = this.getArrayId(tasks);
    tasks.push(task);

    this.setTasks(tasks);
  }

  updateTask(task) {
    const tasks = this.getTasks();
    const index = this.getElementIndexById(tasks, task.id);

    tasks[index] = task;
    this.setTasks(tasks);
  }

  deleteTask(taskId) {
    const tasks = this.getTasks();
    const index = this.getElementIndexById(tasks, taskId);

    tasks.splice(index, 1);
    this.setTasks(tasks);
  }

  getStudents() {
    return (dispatch) => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}api/profiles`)
        .then((response) => {
          dispatch({ type: 'ADD_ALL_USERS', students: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }

  getStudent(id) {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/member-profile/${id}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addStudent(newStudent) {
    return (dispatch) => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}api/member-profile`, newStudent)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }

  __deleteStudent(props) {
    axios.delete({
      url: `/api/member-profile/${props.id}`,
    });
  }

  editStudent(id) {
    axios
      .put({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}api/member-profile/${id}`,
        data: { id },
      })
      .then((response) => {
        const student = response.data;
        return student;
      });
  }

  getStudentProgress(props) {
    axios
      .get(`/api/user-progress/${props.id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  getStudentTasks(props) {
    axios
      .get(`/api/member-profile/tasks/${props.id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  getTasks() {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/tasks`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const storage = new Storage();

export default storage;
