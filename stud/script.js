

    
function login() {
    let username=document.getElementById("username");
    let password=document.getElementById("password");
    if(username==="admin" && password==="admin")
    {
            location.replace("insert.html");
    }       
    else{
        alert("Invalid username or password");
    }
}
function insert() {
    const form = document.getElementById('insertForm');
    const formData = new FormData(form);

    fetch('http:localhost:8080//insert', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert("Inserted successfully");
    })
    .catch(error => {
        alert('something went wrong:');
    });
}

function deletes() {
    const form = document.getElementById('deleteForm');
    const formData = new FormData(form);

    fetch('http:localhost:8080//deletes', {
        method: 'POST',
        body: formData,
    
    })
    .then(response => response.json())
    .then(data => {
        alert("deleted successfully");
    })
    .catch(error => {
        alert('something went wrong:');
    });
}

function update() {
    const form = document.getElementById('updateForm');
    const formData = new FormData(form);

    fetch('http:localhost:8080//update', {
        method: 'POST',
        body: formData,
    
    })
    .then(response => response.json())
    .then(data => {
        alert("update successfully");
    })
    .catch(error => {
        alert('something went wrong:');
    });
}


function read() {
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    fetch('http:localhost:8080//read', {
        method: 'POST',
        body: formData,
    
    })
    .then(response => response.json())
    .then(data => {
        students=data.students;
        students.forEach(student => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = student.id;
            row.insertCell(1).textContent = student.name;
            row.insertCell(2).textContent = student.email;
            row.insertCell(3).textContent = student.dob;
            row.insertCell(4).textContent = student.department;
    })
    .catch(error => {
        alert('something went wrong:');
    });
    });
}

