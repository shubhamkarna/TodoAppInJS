const inputEle = document.getElementById('todo');
const todoListEle = document.getElementById('todo-list');
const editTodoEle = document.getElementById('edit-todo');
editingTodoEle = document.getElementById('editing-todo');
cancelEditBtnEle = document.getElementById('cancel');

const todos =  localStorage.getItem('todoList');
if(todos) {
    let todosArr = JSON.parse(todos);
    console.log(todosArr);
    todosArr.forEach((todoItem) => {
        console.log(todoItem);
        const todoEle = createTodoList(todoItem.name);
        todoListEle.append(todoEle);
    })
}

inputEle.addEventListener('keyup', function(e) {
    if(e.key === "Enter") {
        const inputEle = document.getElementById('todo');
        // lets take the value first
        const value = inputEle.value;

        if(value.trim()) {
            const editTodoEle = document.getElementById('edit-todo');
            const editId = editTodoEle.value;
            if(editId) {
                // edit
                const todoItem = document.getElementById(editId);
                todoItem.innerText = value;
                clearInputs();
                setLocalStorage();
            } else {
                 // list append
            const todoEle = createTodoList(value);
            todoListEle.append(todoEle);
            clearInputs();
            const todo = {
                name: value,
                id: 'randomID',
            }
            setLocalStorage(todo);
        }
           

        }
    }
})

todoListEle.addEventListener('click', function(e) {
    const isEditClicked = (e.target.classList.contains('edit'));
    const isDeleteClicked = (e.target.classList.contains('delete'));
    
    if(isEditClicked) {
        const inputEle = document.getElementById('todo');
        const target = e.target;
        inputEle.value = target.dataset.name;
        editTodoEle.value = target.dataset.id;
        editingTodoEle.style.display = 'inline-block';
        cancelEditBtnEle.style.display = 'inline-block';

    }
    if(isDeleteClicked) {
        const target = e.target;
        target.closest('li').remove();
    }
})

cancelEditBtnEle.addEventListener('click', function() {
    clearInputs();
})

function createTodoList(value) {
    const id = uuid.v4();
    const li = document.createElement('li');
            li.innerHTML = `
            <div class="todo-content">
                <span id="${id}">
                    ${value}
                </span>
                <span>
                   
                    <i class="lni lni-pencil-alt edit" data-name="${value}" data-id="${id}"></i>
                    
        
                    
                    <i class="lni lni-trash-can delete" data-id="id"></i>
                    
                </span>
            </div>
            `
    return li;
}


function clearInputs() {
    const inputEle = document.getElementById('todo');
    const editTodoEle = document.getElementById('edit-todo');
    editingTodoEle = document.getElementById('editing-todo');
    
    cancelEditBtnEle.style.display = 'none';
    editingTodoEle.style.display = 'none';
    
    inputEle.value = '';
    editTodoEle.value = '';
}

function setLocalStorage(todo) {
    const todoList = localStorage.getItem('todoList');
    if(todoList) {
        const list = JSON.parse(todoList);
        list.push(todo);
        localStorage.setItem('todoList', JSON.stringify(list));

    }else {
        const todoList = [];
        todoList.push(todo);
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }
}