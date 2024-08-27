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

const state = {
    taskList: [],
}

//* DOM Operations
const taskContents = document.querySelector(".task__contents");  //selects entire div of that particular class
const taskModal = document.querySelector(".task__modal__body");

// Template for the cards on the screen 
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

const updateLocalStorage = () =>
{
    localStorage.setItem(
        "tasky",
        JSON.stringify({
            tasks: state.taskList,
        })
    )
}

// Load initial data