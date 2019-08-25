let students = [];

function getStudents() {
  students = JSON.parse(localStorage.getItem('students'));
}

function setStudents(props) {
  localStorage.setItem('students', JSON.stringify(props));
}

// let students = [
//   {
//     id: 3,
//     name: 'Clementine Bauch',
//     lastName: 'Samantha',
//     direction: 'Java',
//     education: 'BNTU',
//     start: '01.02.2019',
//     age: '21'
//   },
//   {
//     id: 4,
//     name: 'Patricia Lebsack',
//     lastName: 'Karianne',
//     direction: 'Java',
//     education: 'BNTU',
//     start: '01.02.2019',
//     age: '21'
//   }
// ];

//   {
//     id: 5,
//     name: 'Chelsey Dietrich',
//     username: 'Kamren',
//     direction: 'Java',
//     education: 'BNTU',
//     start: '01.02.2019',
//     age: '21'
//   },
//   {
//     id: 6,
//     name: 'Mrs. Dennis Schulist',
//     username: 'Leopoldo_Corkery',
//     direction: 'Java',
//     education: 'BNTU',
//     start: '01.02.2019',
//     age: '21'
//   },
//   {
//     id: 7,
//     name: 'Kurtis Weissnat',
//     username: 'Elwyn.Skiles',
//     direction: 'Java',
//     education: 'BNTU',
//     start: '01.02.2019',
//     age: '21'
//   },
//   {
//     id: 8,
//     name: 'Nicholas Runolfsdottir V',
//     username: 'Maxime_Nienow',
//     direction: 'Java',
//     education: 'BNTU',
//     start: '01.02.2019',
//     age: '21'
//   },
//   {
//     id: 9,
//     name: 'Glenna Reichert',
//     username: 'Delphine',
//     direction: 'Java',
//     education: 'BNTU',
//     start: '01.02.2019',
//     age: '21'
//   },
//   {
//     id: 10,
//     name: 'Clementina DuBuque',
//     username: 'Moriah.Stanton',
//     direction: 'Java',
//     education: 'BNTU',
//     start: '01.02.2019',
//     age: '21'
//   }
// ];

export { students, getStudents, setStudents };
