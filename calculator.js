let previousClicked = "";
let inputResult = 0;
let data = {
    op1: "",
    operator: "",
    op2: ""
}

function buttonClicked(valueClicked) {
    if(!isNaN(valueClicked)){
        doNumber(valueClicked);
    } else {
        doOperator(valueClicked);
    }
}

function doNumber(valueClicked) {
    if(previousClicked === "" || (!isNaN(previousClicked) && data.op2 === "")) {
        data.op1 = data.op1.concat(valueClicked);
        showResult(data.op1);
    } else {
        data.op2 = data.op2.concat(valueClicked);
        showResult(data.op2);
    }
    previousClicked = valueClicked;
}

function doOperator(valueClicked) {
    if(data.op1 === "" && valueClicked != "C" && valueClicked != "←") {

        showResult("first clicked a number", "error");
    } else {
        switch (valueClicked) {
            case "C":
                clearData();
                showResult("");
                break;
            case "←":
                if(parseInt(data.op2) > 0) {
                    data.op2 = deleteOneNumber(data.op2);
                } else if(parseInt(data.op1 > 0)) {
                    data.op1 = deleteOneNumber(data.op1);
                }
                break;
            case "=":
                doMath();
                break;
            default:
                switch (valueClicked) {
                    case "÷":
                        valueClicked = "/";
                        break;
                    case "x":
                        valueClicked = "*";
                        break;
                }

                data.operator = valueClicked;
                previousClicked = valueClicked;
                break;
        }
    }
}

function doMath() {
    inputResult = parseInt(eval(data.op1 + data.operator + data.op2));
    showResult(inputResult);
    clearData();

    data.op1 = inputResult;
}

function deleteOneNumber(originalValue) {
    const arrNumber = Array.from(originalValue);
    console.table(arrNumber);
    const index = arrNumber.length-1;
    if(index >= 0) {
        arrNumber.splice(index);
        const newValue = arrNumber.join("");
        showResult(newValue);
        return newValue;
    }
}

function clearData() {
    data.op1 = "";
    data.operator = "";
    data.op2 = "";
    previousClicked = "";
}

function showResult(resultOperation, type) {
    divResult = document.querySelector(".result");
    if (type === "error") {
        divResult.className = "result error"
    } else {
        divResult.className = "result"
    }
    divResult.innerText = resultOperation;
    console.table(data);
}

function init() {
    document.querySelector(".flex-container").addEventListener("click", function(event){
        if(event.target.className.includes("button")) {
            buttonClicked(event.target.innerText);
        }
    });
}

init();