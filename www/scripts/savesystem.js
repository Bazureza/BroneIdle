function save(){
    localStorage.setItem("data-brou", getData());
}

function load(){
    return localStorage.getItem("data-brou");
}

function getData(){
    return JSON.stringify(statusBrone.getData());
}