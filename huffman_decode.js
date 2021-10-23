let fs = require("fs");
let arg = process.argv;
let inputDataCode = fs.readFileSync('code.txt');
inputDataCode = inputDataCode.toString();
let inputDataString = fs.readFileSync('output.txt');
inputDataString = inputDataString.toString();
let alphCode = new Array();
let code = '';
let letter = '';
let it_letter = true;
let maxi = 0;
for (let i = 0; i < inputDataCode.length; i++) {
	if (inputDataCode.charAt(i) == ' ') {
		it_letter = false;
		continue;
	} else if (inputDataCode.charAt(i) == '\n') {
		alphCode[code] = letter;
		code = '';
		letter = '';
		it_letter = true;
		continue;
	}
	if (it_letter) {
		letter += inputDataCode.charAt(i);
	} else {
		code += inputDataCode.charAt(i);
	}
}
alphCode[code] = letter;
code = '';
let answer = '';
for (let i = 0; i < inputDataString.length; i++) {
	code += inputDataString.charAt(i);
	if (alphCode[code] != undefined) {
		answer += alphCode[code];
		code = '';
		count = 0;
	}
}
fs.writeFileSync('input.txt', answer);