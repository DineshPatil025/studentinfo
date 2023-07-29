const cl = console.log

const stdForm = document.getElementById('stdForm');
const trStdContainer = document.getElementById('trStdContainer');
const fnameControl = document.getElementById('fname');
const lnameControl = document.getElementById('lname');
const contactControl = document.getElementById('contact');
const emailControl = document.getElementById('email');
const stdCount = document.getElementById('stdCount');

let stdInfoArray = [];

// TEMPLATING FUNCTION
let templating = (arr) => {
    let result = ''

    arr.forEach((std, i) => {
        result += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${std.fname}</td>
                        <td>${std.lname}</td>
                        <td>${std.contact}</td>
                        <td>${std.email}</td>
                        <td class="iconEdit">
                            <i class="fa-solid fa-pen-to-square text-success " onclick="btnEdit(this)"></i>
                        </td>
                        <td class="iconDelete">
                            <i class="fa-solid fa-trash-can text-danger " onclick="btnDelete(this)"></i>
                        </td>
                    </tr>
        
        `
    });
    trStdContainer.innerHTML = result;


    stdForm.reset();
    fnameControl.focus()
}

if (JSON.parse(localStorage.getItem('stdInfoArray'))) {
    stdInfoArray = JSON.parse(localStorage.getItem('stdInfoArray'));
    templating(stdInfoArray)
    stdCount.style.color = 'green'
    stdCount.innerHTML = `Number of students are : ${stdInfoArray.length}`;
} else {
    stdCount.style.color = 'red'
    stdCount.innerHTML = `No students added yet!!!!!`;
}




// ON FORM SUBMIT FUNCTIONALITY
let onstdFormSubmit = (eve) => {
    eve.preventDefault();
    let stdInfoObj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        contact: contactControl.value,
        email: emailControl.value
    }
    cl(stdInfoObj)
    stdInfoArray.unshift(stdInfoObj);
    localStorage.setItem('stdInfoArray', JSON.stringify(stdInfoArray))
    stdCount.style.color = 'green'
    stdCount.innerHTML = `Number of students are : ${stdInfoArray.length}`;
    cl(stdInfoArray)
    templating(stdInfoArray);

    Swal.fire({
        icon: 'success',
        title: `${stdInfoObj.fname} ${stdInfoObj.lname}`,
        text: 'has been registered successfully',
        timer: 4000
    })
}

stdForm.addEventListener("submit", onstdFormSubmit)