const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
//getting all these elements from the HTML doucment

const taskData = JSON.parse(localStorage.getItem("data")) || [];
console.log(taskData);
/*is used to initialize the taskData array by retrieving and parsing any saved task data from localStorage. Here’s a breakdown of its purpose and functionality:

localStorage.getItem("data"):

This retrieves the stringified data associated with the "data" key in localStorage. If "data" exists, it returns a JSON string; otherwise, it returns null.
JSON.parse(...):

If "data" exists, JSON.parse converts the JSON string back into an array or object (in this case, presumably an array of task objects).
If "data" does not exist, JSON.parse(null) would return null.
|| []:

If JSON.parse(localStorage.getItem("data")) returns null (meaning there is no existing data in localStorage), the || [] part provides a default empty array [].
This ensures taskData is always initialized as an array, allowing the application to proceed without errors even if there is no saved data.
*/
let currentTask = {};

const removeSpecialChars=(string)=>{
   return string.replace(/[^a-zA-Z0-9 @]/g, "");
};
/*Regex /[^a-zA-Z0-9 ]/g
[^...] matches any character that is not in the specified set.
a-zA-Z0-9 allows only letters (uppercase and lowercase) and numbers.
The space after 0-9 allows spaces to remain.
The g flag (global) ensures that all occurrences of special characters in the string are removed.
*/
const addOrUpdateTask = () => {
    if(!titleInput.value.trim())//condition used to check if the title has no value or only spaces//
    {
        alert("Please provide a title");
        return;
      }
    // declaring a variable as dataArrIndex and set it id of the taskData initially -1//
        const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
        //this is the task object used to define the task we add in the taskData array structure of an task//
        const taskObj = {
          id: `${ removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}`, 
          title: removeSpecialChars(titleInput.value),
          date: dateInput.value,
          description: removeSpecialChars(descriptionInput.value),
      };
       /* this if condition is used to check when the dataArrIndex ===-1 then add the taskobj to the taskData array else updates 
       the existing task 
       at the index dataArrIndex with the new taskObj details, effectively replacing the old task data with the updated task*/
        if (dataArrIndex === -1) {
          taskData.unshift(taskObj);
        } else {
          taskData[dataArrIndex] = taskObj;
        }
      
        localStorage.setItem("data", JSON.stringify(taskData));
        
       /* JSON.stringify(taskData) converts taskData back into a JSON string format before saving, as localStorage only stores data in string format */

        updateTaskContainer()
        reset()
      };
      
      const updateTaskContainer = () => {
        //initially setting the innerHTML of taskContainer to a empty string//
        tasksContainer.innerHTML = "";
      //for each task in taskdata array use object destruction to get the task object properties and push that into the taskContainer innerHTML//
        taskData.forEach(
          ({ id, title, date, description }) => {
              (tasksContainer.innerHTML += `
              <div class="task" id="${id}">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Description:</strong> ${description}</p>
                <button onclick="editTask(this)" type="button" class="btn">Edit</button>
                <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
              </div>
            `)
          }
        );
      };
      
      //this function used to delete a previous task with the delete button as parameter//
      const deleteTask = (buttonEl) => {
        //declaring a dataArrIndex to set the id of the element to delete i.e which task's delete button we pressed that task id is assigned to dataArrIndex//
        const dataArrIndex = taskData.findIndex(
          (item) => item.id === buttonEl.parentElement.id
        );
      //removes the task we want to delete by removing its parenElement and using splice method to remove the task from the task data//
        buttonEl.parentElement.remove();
        taskData.splice(dataArrIndex, 1);//at dataArrIndex one element
        //updating the localstorage after deletion//
        localStorage.setItem("data", JSON.stringify(taskData));
      }
      
      const editTask = (buttonEl) => {
          const dataArrIndex = taskData.findIndex(
          (item) => item.id === buttonEl.parentElement.id
        );
      // the task we want to edit now becomes the current task so again the task form opens in order to update the task//
        currentTask = taskData[dataArrIndex];
        titleInput.value = currentTask.title;
        dateInput.value = currentTask.date;
        descriptionInput.value = currentTask.description;
      
        addOrUpdateTaskBtn.innerText = "Update Task";
      
        taskForm.classList.toggle("hidden");  
      }
      //reset function is used in addOrUpdate function//
      //reset function is used in while closing the form with some entries and discard dialog shows to again resetting the taskform//
      //when an entry in task form is finished it gets resetted for the next entry//
      
      const reset = () => {
        addOrUpdateTaskBtn.innerText = "Add Task";
        titleInput.value = "";
        dateInput.value = "";
        descriptionInput.value = "";
        taskForm.classList.toggle("hidden");
        currentTask = {};
      }
      // if condition is used to check taskData has some elements if so update the task container by calling updateTaskContainer function//
      if (taskData.length) {
        updateTaskContainer();
      }
      
      openTaskFormBtn.addEventListener("click", () =>
//when clicking the addNew task button it adds (Or) remove the hidden class in the task-form section//
        taskForm.classList.toggle("hidden")
      );
      //close task form is the wrong mark button when clicking that this triggers//
      closeTaskFormBtn.addEventListener("click", () => {
        const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
        const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;
      //if there is inputs in the taskform show the cancel and discard modal or else reset//
        if (formInputsContainValues && formInputValuesUpdated) {
          confirmCloseDialog.showModal();
        } else {
          reset();
        }
      });
      // for cancel button in dialog modal//
      cancelBtn.addEventListener("click", () => confirmCloseDialog.close());
      //for discard button in dialog modal//
      discardBtn.addEventListener("click", () => {
        confirmCloseDialog.close();
        reset()
      });
      //while submitting the form//
      taskForm.addEventListener("submit", (e) => {
        //when clicking enter to prevent default actions by browser//
        e.preventDefault();
      
        addOrUpdateTask();
      });