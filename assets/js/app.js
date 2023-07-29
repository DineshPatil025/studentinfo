const cl = console.log

const stdForm = document.getElementById('stdForm');
const trStdContainer = document.getElementById('trStdContainer');
const fnameControl = document.getElementById('fname');
const lnameControl = document.getElementById('lname');
const contactControl = document.getElementById('contact');
const emailControl = document.getElementById('email');
const stdCount = document.getElementById('stdCount');
const btnSubmit = document.getElementById('btnSubmit');
const btnUpdate = document.getElementById('btnUpdate');
const stdTable = document.getElementById('stdTable');

let stdInfoArray = [];


// UID FUNCTION
function uuid() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


// TEMPLATING FUNCTION

let templating = (arr) => {
    let result = ''

    arr.forEach((std, i) => {
        result += `
                    <tr id = "${std.stdId}">
                        <td>${i + 1}</td>
                        <td>${std.fname}</td>
                        <td>${std.lname}</td>
                        <td>${std.contact}</td>
                        <td>${std.email}</td>
                        
                        <td class="iconEdit">
                            <i class="fa-solid fa-pen-to-square " onclick="btnEdit(this)"></i>
                        </td>
                        <td class="iconDelete">
                            <i class="fa-solid fa-trash-can " onclick="btnDelete(this)"></i>
                        </td>
                        
                       
                    </tr>
        
        `
    });
    trStdContainer.innerHTML = result;


    stdForm.reset();
    fnameControl.focus()
}


// EDIT FUNCTIONALITY
let btnEdit = (editIcon) => {
    cl(editIcon)
    let editId = editIcon.closest('tr').id;
    cl(editId)

    let stdEditObj = stdInfoArray.find(std => {
        return std.stdId === editId
    })
    cl(stdEditObj)
    localStorage.setItem('stdEditObj', JSON.stringify(stdEditObj))
    fnameControl.value = stdEditObj.fname;
    lnameControl.value = stdEditObj.lname;
    contactControl.value = stdEditObj.contact;
    emailControl.value = stdEditObj.email;

    btnSubmit.classList.add('d-none');
    btnUpdate.classList.remove('d-none');


}
if (localStorage.getItem('stdInfoArray')) {
// if (localStorage.getItem('stdInfoArray')) {
    stdInfoArray = JSON.parse(localStorage.getItem('stdInfoArray'));
    templating(stdInfoArray)
    stdTable.classList.remove('d-none')
    stdCount.style.color = 'green'
    stdCount.innerHTML = `Number of students are : ${stdInfoArray.length}`;
} else {
    stdCount.style.color = 'red'
    stdCount.innerHTML = `No students added yet!!!!!`;
    stdTable.classList.add('d-none')
}

const btnDelete = (std) => {

    let confirmDelete = confirm('Are you sure, you want to delete this Student Info?')

    if (confirmDelete) {
        let deleteId = std.closest('tr').id;
        stdInfoArray = stdInfoArray.filter(std => std.stdId != deleteId)
        localStorage.setItem('stdInfoArray', JSON.stringify(stdInfoArray))
        stdTable.classList.remove('d-none')
        document.getElementById(deleteId).remove()
        
        if (stdInfoArray.length) {
            stdTable.classList.remove('d-none')
            stdCount.style.color = 'green'
            stdCount.innerHTML = `Number of Students are ${stdInfoArray.length}`
        } else {
            localStorage.removeItem('stdInfoArray')
            stdCount.style.color = 'red'
            stdCount.innerHTML = 'No Student Record Found Yet !!!'
            stdTable.classList.add('d-none')
        }      

    } else {
        return
    }

    Swal.fire({
        icon: 'success',
        title: 'record has been deleted succesfully',        
        timer: 4000
    }) 
}

// ON FORM SUBMIT FUNCTIONALITY
let onstdFormSubmit = (eve) => {
    eve.preventDefault();
    let stdInfoObj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        contact: contactControl.value,
        email: emailControl.value,
        stdId: uuid()
    }
    cl(stdInfoObj)
    stdInfoArray.unshift(stdInfoObj);
    localStorage.setItem('stdInfoArray', JSON.stringify(stdInfoArray))
    stdTable.classList.remove('d-none')
    stdCount.style.color = 'green'
    stdCount.innerHTML = `Number of students are : ${stdInfoArray.length}`;
 
    templating(stdInfoArray);

    Swal.fire({
        icon: 'success',
        title: `${stdInfoObj.fname} ${stdInfoObj.lname}`,
        text: 'has been added successfully',
        timer: 4000
    })
}


let onbtnUpdate = () => {


    let updateId = JSON.parse(localStorage.getItem('stdEditObj')).stdId;
    let editeFName = JSON.parse(localStorage.getItem('stdEditObj')).fname;
    let editeLName = JSON.parse(localStorage.getItem('stdEditObj')).lname;
    cl("update id :", updateId)

    let stdUpdateObj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        contact: contactControl.value,
        email: emailControl.value

    }
    cl(stdUpdateObj)

    for (let i = 0; i < stdInfoArray.length; i++) {
        if (stdInfoArray[i].stdId === updateId) {
            stdInfoArray[i].fname = stdUpdateObj.fname
            stdInfoArray[i].lname = stdUpdateObj.lname
            stdInfoArray[i].contact = stdUpdateObj.contact
            stdInfoArray[i].email = stdUpdateObj.email
        }
        localStorage.setItem('stdInfoArray', JSON.stringify(stdInfoArray));
    }
    cl(stdInfoArray)
    localStorage.setItem('stdInfoArray', JSON.stringify(stdInfoArray))
    let tr = [...document.getElementById(updateId).children]
    cl(tr)
    tr[1].innerHTML = stdUpdateObj.fname
    tr[2].innerHTML = stdUpdateObj.lname
    tr[3].innerHTML = stdUpdateObj.contact
    tr[4].innerHTML = stdUpdateObj.email

    stdForm.reset();

    Swal.fire({
        icon: 'success',
        title: `changes has been made in ${editeFName} ${editeLName} `,
        // text: 'has been updated successfully',
        timer: 3000
    })

    btnSubmit.classList.remove('d-none')
    btnUpdate.classList.add('d-none')
    fname.focus();
}


btnUpdate.addEventListener('click', onbtnUpdate)

stdForm.addEventListener("submit", onstdFormSubmit)