function Node(letter, freq, used, father, code) {
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.father = father;
	this.code = code;
}

function FindCode(node) {
	if (node.code != '') {
		return 0;
	}
	if (tree[node.father].code != '') {
		node.code = tree[node.father].code + '1';
	} else {
		if (node.letter == tree[mini_index].letter) {
			node.code = '0';
		} else if (node.letter == tree[premini_index].letter) {
			node.code = '1';
		} else {
			FindCode(tree[node.father]);
			node.code = tree[node.father].code + '0';
		}
	}
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
	let countNode;
	countNode = count + 1;
	for (let i = 0; i < count - 2; i++) {
		mini = Number.POSITIVE_INFINITY;
		premini = Number.POSITIVE_INFINITY;
		mini_index = 0;
		premini_index = 0;
		for (let j = 0; j < countNode; j++) {
			if (!tree[j].used && tree[j].freq <= mini) {
				premini = mini;
				premini_index = mini_index;
				mini = tree[j].freq;
				mini_index = j;
			} else if (!tree[j].used && tree[j].freq <= premini) {
				premini = tree[j].freq;
				premini_index = j;
			}
		}
		countNode++;
		let n = new Node(tree[mini_index].letter + tree[premini_index].letter, tree[mini_index].freq + tree[premini_index].freq, false, null, '');
		tree.push(n);
		tree[premini_index].used = true;
		tree[premini_index].father = countNode - 1;
		tree[mini_index].used = true;
		tree[mini_index].father = countNode - 1;
	}
	for (let i = 0; i < count; i++) {
		FindCode(tree[i]);
	}
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