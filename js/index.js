function validateNumber(id) {
    let element = document.getElementById(id)
    var regExp = /^[0-9]{10}$/;
    if(!regExp.text(element.value)){
        element.style.border = '2px solid red'
        return false
    }
    element.style.border= '2px solid green'
}