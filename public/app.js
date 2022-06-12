
let params = (new URL(document.location)).searchParams;
let uuid = params.get("uuid");
console.log("uuid", uuid)

const charObj = {
    Emogies: ["🐷", "🐮", "🐔", "🐇", "🦔", "🐒", "🦍", "👨", "👩", "👽", "🐶", "🐱", "🐻", "🐯", "🦁", "🧐", '🤪', '😀', '😁', '🤗', '🤭', '🤐', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '🤖', '💩', '😈', '👿', '👹', '👺', '💀', '☠', '👻', '👇', '🖕', '✌', '👆', '☝', '👉', '👈', '👍', '👎', '👅', '👄', '💋', '💘', '🍨', '🍩', '😢', '😭', '💄', '💍', '🍮', '🍦', '🍧', '🎂', '🍰', '🍪', '🍇', '🍉', '🍓', '🍑', '🍈', '🍌', '👏', '💪', '💕', '💞', '💖', '🍹', '🍷', '🍴', '🍕', '🍔', '🍟', '🍗'],
    Alphabets: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '<', '>', '?', '_', '`', '~', '/', ';', ':', ',', '.', '[', ']', '{', '}', '|', '"', "'"]
}

let currentFrom = 'Alphabets', currentTo = "Emogies", obj = { emogiesIndex: [], alphabetsIndex: [], uuid: uuid ? uuid : '00000' };


const randomizeUUID = () => {
    return Math.floor(Math.random() * 1000000)
}

const addData = () =>{
    db.collection("").doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

const changeUUID = () => {
    obj = { emogiesIndex: [], alphabetsIndex: [], uuid: randomizeUUID() }
    document.getElementById("uuid").value = obj.uuid
    params.set("uuid", obj.uuid);
    history.replaceState(null, null, "?" + params.toString());
    randomamizeArray(charObj.Emogies, "emogies")
    randomamizeArray(charObj.Alphabets, "alphabets")
    console.log("obj", obj)
    storeLocalStorage()
    change("Emogies", "Alphabets")
}

const storeLocalStorage = () => {
    localStorage.setItem("emogies", JSON.stringify(obj.emogiesIndex))
    localStorage.setItem("alphabets", JSON.stringify(obj.alphabetsIndex))
    localStorage.setItem("uuid", JSON.stringify(obj.uuid))
}

const randomamizeArray = (array, type) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        // Pick a remaining element.
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];

        if (type == "emogies") {
            obj.emogiesIndex.push({ current: currentIndex, random: randomIndex })
        } else {
            obj.alphabetsIndex.push({ current: currentIndex, random: randomIndex })
        }
    }
    return array
}

const emojiStringToArray = (str) => {
    split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
    let arr = [];
    for (var i = 0; i < split.length; i++) {
        char = split[i]
        if (char !== "") {
            arr.push(char);
        }
    }
    return arr;
};

const convert = () => {
    let string = document.getElementById("convertedFrom").value, uuid = randomizeUUID();
    let arrFrom = charObj[currentFrom], arrTo = charObj[currentTo], strArr = [], newArr = []

    if (currentFrom == "Emogies") {
        strArr = emojiStringToArray(string)
    } else {
        strArr = string.split('')
    }

    for (let i = 0; i < strArr.length; i++) {
        let val = arrTo[arrFrom.indexOf(strArr[i])]
        if (strArr[i] == ' ') {
            val = '&nbsp;'
        } else if (strArr[i] == '\n') {
            val = '<br>'
        }
        newArr.push(val)
    }

    document.getElementById("convertedTo").innerHTML = newArr.join('')
}

const change = (from, to) => {
    fromSpan.innerHTML = to
    toSpan.innerHTML = from
    currentTo = toSpan.innerHTML
    currentFrom = fromSpan.innerHTML
    document.getElementById("convertedFrom").value = ""
    document.getElementById("convertedTo").innerHTML = ""
}
