// state is mainly used as an object that stores something.
// var state = {   (JUST EXAMPLE)
//     taskList: [
//         {
//             imageUrl: "",
//             taskType: "",
//             taskTitle: "",
//             taskDesc: ""
//         },
//         {
//             imageUrl: "",
//             taskType: "",
//             taskTitle: "",
//             taskDesc: ""
//         },
//         {
//             imageUrl: "",
//             taskType: "",
//             taskTitle: "",
//             taskDesc: ""
//         },
//         {
//             imageUrl: "",
//             taskType: "",
//             taskTitle: "",
//             taskDesc: ""
//         },
//         {
//             imageUrl: "",
//             taskType: "",
//             taskTitle: "",
//             taskDesc: ""
//         },
//     ]
// }


//~ (kind of a backup storage) --> data on the local storage is not persistant, reloading the page erases the data
const state = {
    taskList: [],
}

//& DOM Operations
const taskContents = document.querySelector(".task__contents");  //selects entire div of that particular class
const taskModal = document.querySelector(".task__modal__body");  //we are using querySelector instead of getElementById/Class so we can push something from js to html, not calling html to js file.

//& Template for the cards on the screen 
//* to access js parameters in html part, use ${} 
//can use either '  or " both works fine
//element identifier key=${id} is missing on line 50th
const htmlTaskContent = ({id, title, description, type, url}) => ` 
    <div class='col-md-6 col-lg-4 mt-3' id = ${id}> 
      <div class='card shadow-md task__card'>
        <div class='card header d-flex justify-content-end task__card__header'>
          <button type="button" class="btn btn-outline-primary mr-1.5" name= ${id}>
            <i class="fas fa-pencil-alt" name= ${id}></i>
          </button>
          <button type="button" class="btn btn-outline-danger mr-1.5" name= ${id}>
            <i class="fas fa-trash-alt" name= ${id}></i>
          </button>
        </div>
        <div class="card-body">
          ${
            url &&
            `<img width='100%' src=${url} alt="Card Image" card='card-img-top' md-3 rounded-lg />`
          }
          <h4 class='card-title task__card__title>${title}</h4>
          <p class='description trim-3-lines text-muted'>${description}</p>
          <div class='tags text-white d-flex flex-wrap'>
            <span class="badge bd-primary m-1">${type}</span>
          </div>
        </div>
        <div class="card-footer">
          <button type='button' class='btn btn-outline-primary float-right data-bs-toggle="modal" data-bs-target="#showTask" '>Open Task</button>
        </div>
      </div>
    </div>
`;

// Modal body on >> click on Open Task
const htmlModalContent = ({id, title, description, url}) =>{
    const date = new Date(parseInt);
    return `
    <div id=${id}>
      ${
        url &&
        `<img width='100%' src=${url} alt="Card Image" card='card-img-top' md-3 rounded-lg class='img-fluid place__holder__image mb-3'/>`
      }
      <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
      <h2 class='my-3'>${title}</h2>
      <p class='text-muted'>${description}</p>
    </div>
    `
};

//* Converting JSON to string (for local storage)
// ~ (browser's local storage, is like a tiny database on your computer that remembers things even after you close the browser.)
//& How this function works ->
//~  it takes your current list of tasks (state.taskList), converts it into a text format using JSON.stringify(), and then stores it under the name "task" in local storage. So, even if you refresh or close the browser, your tasks won't disappear.
const updateLocalStorage = () =>
{
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks: state.taskList,
        })
    )
}

//* Converting String to JSON (for rendering the cards on the screen)
// Load initial data
//~ (This function loads the saved tasks from local storage when the app starts, so you can see them on the screen.)
//& How this function works ->
//~ It grabs the stored data using localStorage.tasks, and turns it back into a regular JavaScript object using JSON.parse(). This is like "unpacking" the data. If there are tasks saved, it assigns those tasks to the state.taskList, so your app knows about them and can display them.
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if(localStorageCopy)
  {
    state.taskList = localStorageCopy.tasks; //assigns the address/reference -> tasks here is a key
  }

  state.taskList.map((cardDate) => {
    taskContents.innerAdjacentHTML("beforeend", htmlTaskContent(cardDate))
  })
}

//^ updateLocalStorage: Saves your tasks.
//^ loadInitialData: Loads your saved tasks when the app starts.

//& when we update/edit -> save changes 
const handleSubmit = (event) => {
  console.log("event triggered");
  //~ To save things from the screen to js file
  const id = `${Date.now()}`; //Date.now() changes every second, it's like a id number
  const input = {
    url: document.getElementById("ImageUrl").value,
    title: document.getElementById("taskTitle".value),
    tags: document.getElementById("tags".value),
    taskDesc: document.getElementById("taskDesc".value),
  };

  if(input.title === "" || input.tags === "" || input.description === "")
  {
    return alert("Kindly fill all the necessary fields.");
  }

  // updating key value using spread operator
  //~ To display all the things on the screen
  taskContents.innerAdjacentHTML("beforeend", htmlTaskContent(...input, id));
  state.taskList.push(...input, id);

  // ~ To store things on the browser
  updateLocalStorage();
};