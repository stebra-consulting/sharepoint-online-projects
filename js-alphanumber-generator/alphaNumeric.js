
//requirements:

//workflow must READ and estimate which number is highest.
//workflow must be able to ++


//must be same ++ as konsumnet(adhoc).

//1. alphaToValue

//2. valueToAlpha

/*
[slot0, slot1, slot2]
slot0 * 100
+
slot1 * 10
+
slot2 * 1
= VALUE
*/



function alphaFrom(number) {


    if (number < 999) {
        return number++;
    }
    if (number === 999) {
        return "A00";
    }
    else {
        number -= 999;
        var numberAsString = "000" + number.toString();

        var len = numberAsString.length

        numberAsString = numberAsString.substring(len - 4, len);

        console.log("numberAsString", numberAsString);

        var n0 = parseInt(numberAsString[3]);
        var n10 = parseInt(numberAsString[2]);
        var n100 = parseInt(numberAsString[1]);
        var n1000 = parseInt(numberAsString[0]);

        console.log(n1000, n100, n10, n0);


        var startNumber = number - 1000;
        var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ?";
        //000
        var slot2 = "A";//0--
        var slot1 = "0";//-0-
        var slot0 = "0";//--0


        //n1000
        for (i = n1000; i > 0; i--) {
            index2 = alphabet.indexOf(slot2);
            slot2 = alphabet[index2 + 1];
            }

        console.log("slot2, slot1, slot0", slot2, slot1, slot0);




        ///




        while (startNumber > 0) {
            index0 = alphabet.indexOf(slot0);
            slot0 = alphabet[index0 + 1];

            if (slot0 === "?") {
                slot0 = "0";
                index1 = alphabet.indexOf(slot1);
                slot1 = alphabet[index1 + 1];
            }
            if (slot1 === "?") {
                slot1 = "0";
                index2 = alphabet.indexOf(slot2);
                slot2 = alphabet[index2 + 1];
            }
            startNumber--;
        }
        return slot2 + slot1 + slot0;
    }


}
alphaFrom(1036);
var n = 1037;

for (i = 0; i < n; i++) {
    console.log(i, alphaFrom(i));
}




function numberFrom(alpha) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var dictionary =
        {
            A: 10, B: 11, C: 12, D: 13, E: 14,
            F: 15, G: 16, H: 17, I: 18, J: 19,
            K: 20, L: 21, M: 22, N: 23, O: 24,
            P: 25, Q: 26, R: 27, S: 28, T: 29,
            U: 30, V: 31, W: 32, X: 33, Y: 34, Z: 35
        };
    var digits = alpha.toUpperCase().split("");
    slot = 0;
    slotValue = 0;
    var values = [];
    var factor = [100, 10, 1];
    if (digits.length != 3) {
        throw new Error("inparameter must be 3 digits");
    }
    for (i = 0; i < digits.length; i++) {

        if (alphabet.indexOf(digits[i]) === -1) {
            slotValue = digits[i]
        }
        else {
            slotValue = dictionary[digits[i]];
        }
        console.log("factor[slot] ", factor[i]);
        console.log("slotValue", slotValue, " * ", factor[i]);
        slotValue *= factor[i];
        values.push(parseInt(slotValue));
        console.log("slotValue is ", slotValue);
    }
    console.log("values: ", values);
    return totalValue = values[0] + values[1] + values[2];
}
numberFrom('A01');


function increment(alpha) {
    var alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZ?";
    var digits = alpha.toUpperCase().split("");
    if (digits.length != 3) {
        throw new Error("inparameter must be 3 digits");
    }
    var char = digits[2];
    var index = alphabet.indexOf(char);
    digits[2] = alphabet[index + 1];
    console.log("char", char, " digits[2]", digits[2]);
    console.log("digits.length", digits.length);
    for (i = digits.length; i > 0; i--) {
        console.log("in for, i:", i);
        if (digits[i] === '?') {
            digits[i] = 0;
            var index = alphabet.indexOf(digits[i - 1]);
            console.log("digits[i - 1] is ", digits[i - 1]);
            console.log("changing letter ", digits[i - 1]);
            digits[i - 1] = alphabet[index + 1];
            console.log(" to ", digits[i - 1]);

        }
    }
    return digits[0] + digits[1] + digits[2];
}
increment("11Z");










/*
...
A00
A01
A02
A03
A04
A05
A06
A07
A08
A09
A0A
A0B //1011
A0C
A0D
A0E
A0F
A0G
A0H
A0I
A0J
A0K
A0L
A0M
A0N
A0O
A0P
A0Q
A0R
A0S
A0T
A0U
A0V
A0W
A0X
A0Y
A0Z ..
A10 //1036
A11


{
            A: 10, B: 11, C: 12, D: 13, E: 14,
            F: 15, G: 16, H: 17, I: 18, J: 19,
            K: 20, L: 21, M: 22, N: 23, O: 24,
            P: 25, Q: 26, R: 27, S: 28, T: 29,
            U: 30, V: 31, W: 32, X: 33, Y: 34, Z: 35
        };

1011

[
    615
    360
36
]
*/




function getNext(num) {
    var alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    var digits = num.toUpperCase().split(""),
        len = digits.length,
        increase = true;
    if (len != 3)
        throw new Error("Invalid serial number length in getNext: " + num);
    for (var i = len - 1; increase && i >= 0; i--) {
        var val = alphabet.indexOf(digits[i]);
        console.log("digits ", digits)
        console.log("alphabet.indexOf(digits[i]) ", alphabet.indexOf(digits[i]));
        console.log("(val == -1) ", (val == -1));
        if (val == -1)
            throw new Error("Invalid serial number digit in getNext: " + num);
        val++;
        if (val < alphabet.length) {
            digits[i] = alphabet[val];
            increase = false;
        } else { // overflow
            digits[i] = alphabet[0];
        }
    }
    if (increase) // is still true
        throw new Error("Serial number overflow in getNext");
    num = digits.join("");
    return num;
}

