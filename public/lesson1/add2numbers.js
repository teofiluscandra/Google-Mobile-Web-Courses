function calc(){
    let number1 = document.getElementById('number1').value
    let number2 = document.getElementById('number2').value
    return document.getElementById('result').innerHTML = parseInt(number1) + parseInt(number2)
}

document.querySelector('button').addEventListener('click', calc)