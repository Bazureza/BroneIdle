function save(){
    localStorage.setItem("data", getData());
}

function load(){
    return localStorage.getItem("data");
}

function getData(){
    return JSON.stringify(statusBrone.getData());
}