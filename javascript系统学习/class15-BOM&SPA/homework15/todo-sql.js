/**
 * Created by Administrator on 2017/10/17.
 */
//  将一个todo返回一个todo_list列表
var make_todo_returnList = function(todo){
    var todo_list = localStorage.todos
    if(todo_list == undefined){
        todo_list = '[]'
    }
    todo_list = JSON.parse(todo_list)
    todo_list.push(todo)
    return todo_list
}

// save_todos
var save_todos = function(todo_list){
    for(var i = 0; i < todo_list.length; i++){
        todo_list[i].id = i + 1
    }
    localStorage.todos = JSON.stringify(todo_list)
}

// delete_todos
var delete_todos = function(id){
    var todoList = load_todos()
    for(var i = 0; i < todoList.length; i++){
        var j = 0
        if(todoList[i].id == id){
            j = i
            delete localStorage.todos[i]
            while((j != todoList.length) && (j != 0)){
                j++
                todoList[j].id -= 1
            }
        }
    }
    save_todos(todoList)
}

var edit_todos = function(id, content){
    var todoList = load_todos()
    for(var i = 0; i < todoList.length; i++){
        if(todoList[i].id == id){
            todoList[i].content = content
        }
    }
    save_todos(todoList)
}

// 加载todos
var load_todos = function(){
    var str_todos = localStorage.todos
    if(str_todos == undefined){
        str_todos = '[]'
    }
    return JSON.parse(str_todos)
}

