function Node(letter, freq, used, father, code) {
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.father = father;
	this.code = code;
}
let fs = require("fs");
let arg = process.argv;
let answer = '';
let alph = new Array();
let alphCode = new Array();
let inputData = fs.readFileSync('input.txt');
inputData = inputData.toString();
for (let i = 0; i < inputData.length; i++) {
	alph[inputData.charAt(i)] = 0;
}
for (let i = 0; i < inputData.length; i++) {
	alph[inputData.charAt(i)]++;
}
let tree = new Array();
let count = 0;
let mini = Number.POSITIVE_INFINITY, premini = Number.POSITIVE_INFINITY;
let mini_index = 0, premini_index = 0;
for (i in alph) {
	let n = new Node(i, alph[i], false, null, '');
	if (alph[i] <= mini) {
		premini = mini;
		premini_index = mini_index;
		mini = alph[i];
		mini_index = count;
	}
	tree.push(n);
	count++;
}
if (count == 1) {
	answer = tree[0].letter + ' ' + 0;
	alphCode[tree[0].letter] = 0;
} else {
	let n = new Node(tree[mini_index].letter + tree[premini_index].letter, tree[mini_index].freq + tree[premini_index].freq, false, null, '');
	tree.push(n);
	tree[mini_index].used = true;
	tree[mini_index].father = count;
	tree[premini_index].used = true;
	tree[premini_index].father = count;
	for (let i = 0; i < count - 2; i++) {
		let mini = Number.POSITIVE_INFINITY;
		let mini_index = 0;
		for (let j = 0; j < count; j++) {
			if (!tree[j].used && tree[j].freq <= mini) {
				mini = tree[j].freq;
				mini_index = j;
			}
		}
		let n = new Node(tree[mini_index].letter + tree[count + i].letter, tree[count + i].freq + tree[mini_index].freq, false, null, '');
		tree.push(n);
		tree[count + i].used = true;
		tree[count + i].father = count + i + 1;
		tree[mini_index].used = true;
		tree[mini_index].father = count + i + 1;
	}
	for (let i = 2 * count - 3; i >= count; i--) {
		tree[i].code = tree[tree[i].father].code + '1';
	}
	for (let i = count - 1; i >= 0; i--) {
		tree[i].code = tree[tree[i].father].code + '0';
		}
	for (let i = count - 1; i >= 0; i--) {
		if (tree[i].father == count) {
			tree[i].code = tree[count].code + '1';
		}
		break;
	}
	tree[mini_index].code = tree[tree[mini_index].father].code + '1';
	for (let i = 0; i < count; i++) {
		answer += tree[i].letter + ' ' + tree[i].code + '\n';
		alphCode[tree[i].letter] = tree[i].code;
	}
}
fs.writeFileSync('code.txt', answer);
answer = '';
for (let i = 0; i < inputData.length; i++) {
	answer += alphCode[inputData.charAt(i)];
}
fs.writeFileSync('output.txt', answer);