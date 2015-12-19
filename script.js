/* Cypher Improved Script */
function status(stat){
	document.getElementById('status').innerHTML = stat;
}
function fragment1(string){
	status('Fragmenting...')
	var frags = [];
	for (var a = 0; a < string.length; a++){
		frags.push(string.substring(a, a+1));
	}
	return frags;
}
function fragment2(string){
	status('Fragmenting...')
	var frags = [];
	for (var a = 0; a < string.length; a+=2){
		frags.push(string.substring(a, a+2));
	}
	return frags;
}
function reconstruct(frags){
	status('Reconstructing string...');
	var string = '';
	for (var a = 0; a < frags.length; a++){
		string = string+frags[a];
	}
	return string;
}
function conctructAlpha(alpha){
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ','.',',','?','!','@','#','$','%','^','&','*','(',')','-','_','=','+','`','~','[','{',']','}','|',';',':','<','>','/'];
	string = '';
	for (var a = 0; a < alpha.length; a++){
		var numStr;
		for (b = 0; b < alphabet.length; b++){
			if (alpha[a] == alphabet[b]){
				numStr = b;
			}
		}
		if (numStr.toString().length == 1) numStr = '0'+numStr.toString();
		string = string+numStr;
	}
	return ('&&'+string);

}
function output(string){
	document.getElementById('message').value = string;
}
function getAlpha(){
	status('Generating Cypher...')
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ','.',',','?','!','@','#','$','%','^','&','*','(',')','-','_','=','+','`','~','[','{',']','}','|',';',':','<','>','/'];
	var newAlpha = [];
	var alpha_used = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
	var num_used = 0;
	var loops = 0;
	while(num_used < alphabet.length){
		loops++;
		var num = (Math.round(Math.random() * alphabet.length));
		if (alpha_used[num] == false && newAlpha.length < alphabet.length){
			newAlpha.push(alphabet[num]);
			alpha_used[num] = true;
			num_used++;
		}
		if (loops > 3000){
			status('An error has occured');
			return false;
		}
	}
	return newAlpha;
}
function findAlpha(string){
	status('Finding cypher')
	var frags = fragment2(string);
	var location = false;
	for (a = 0; a < frags.length; a++){
		if (frags[a] == '&&'){
			location = (a+1);
		}
	}
	frags.splice(0, location);
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ','.',',','?','!','@','#','$','%','^','&','*','(',')','-','_','=','+','`','~','[','{',']','}','|',';',':','<','>','/'];
	if (frags.length != alphabet.length){
		status('An error has occured')
		return false;
	}
	var found = []
	for (var a = 0; a < frags.length; a++){
		for (var b = 0; b < alphabet.length; b++){
			if (Number(frags[a]) == b){
				found.push(alphabet[b]);
			}
		}
	}
	if (found.length == alphabet.length) return found;
	else {
		status('An error has occured');
	}
}
function cypher(string){
	status('Checking string');
	var notAllowed = ['0','1','2','3','4','5','6','7','8','9']
	for (var a = 0; a < notAllowed.length; a++){
		if (string.indexOf(notAllowed[a]) != -1){
			status('Do not use numbers');
			return;
		}
	}
	string = string.toLowerCase();
	var frags = fragment1(string);
	var alphabet = getAlpha();
	if (alphabet == false) return;
	status('Cyphering message...');
	for (var a = 0; a < frags.length; a++){
		for (var b = 0; b < alphabet.length; b++){
			if (frags[a].indexOf(alphabet[b]) != -1){
				var numStr = b;
				if (b.toString().length == 1) numStr = '0'+(b.toString());
				frags[a] = frags[a].replace(alphabet[b], numStr);
			}
		}
	}
	var newString = reconstruct(frags)+conctructAlpha(alphabet);
	output(newString);
	status('Done')
}
function decypher(string){
	status('Checking code');
	string = string.toLowerCase();
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	for (var a = 0; a < alphabet.length; a++){
		if (string.indexOf(alphabet[a]) != -1){
			status('Invalid message');
			return;
		}
	}
	delete alphabet;
	var frags = fragment2(string);
	var location = false;
	for (a = 0; a < frags.length; a++){
		if (frags[a] == '&&'){
			location = (a+1);
		}
	}
	frags.splice(location-1, frags.length);
	var alphabet = findAlpha(string);
	if (alphabet == false) return;
	status('Decyphering message...');
	for (var a = 0; a < frags.length; a++){
		for (var b = 0; b < alphabet.length; b++){
			var numStr = b.toString();
			if (numStr.length == 1) numStr = ('0'+b.toString());
			if (frags[a] == numStr){
				frags[a] = frags[a].replace(numStr, alphabet[b]);
			}
		}
	}
	var newString = reconstruct(frags);
	output(newString);
	status('Done')

}
window.onerror = function(){
	if(confirm('Something has gone wrong; Reload the page?')){
		window.location.reload();
	}
};
