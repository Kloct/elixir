export function colorPicker(){
	let color = {c:null, h:null};
	const hue = Math.floor(Math.random() * 360);
  color.c = `hsl(${hue}, 40%, 50%)`;
  color.h = `hsl(${hue}, 40%, 80%)`;
	return color;
}
export function acr(s){
  var words, acronym, nextWord, index;
    words = s.split(' ');
    acronym= "";
    index = 0
  while (index<words.length) {
    nextWord = words[index];
    acronym = acronym + nextWord.charAt(0);
    index = index + 1 ;
  }
  return acronym
}

export function formatString(s){
	if (s!=null) return s.replace(/\$BR/g, '<br />')
	else return ""
}

export function formatDate(u){
  let d = new Date(u*1000);
  return(d.toLocaleString());
  //return(new Date(u*1000));
}