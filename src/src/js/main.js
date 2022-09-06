 //replaces at a speicfic index in a string
 String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
//radomizes the string
function random_content_generator (){
    const characters ='abcd efghijk lmn opqrstuvwxy z';
    const numbers = '12345679'
    function generateString(temp_text) {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < temp_text.length; i++ ) {
            //randomizes numbers into other numbers
            if (temp_text[i].match(/[1-9]/)){
                result += numbers.charAt(Math.floor(Math.random() * numbers.length));

            }
            //randomizes other characters
            else{
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        }
        return result;
    }
    var body;            
    var input = document.getElementById("input").value;
    var parser = new DOMParser();
    var doc = parser.parseFromString(input, "text/html");
    //Gets content that is in all body tags in the document, each piece of content stored between body tag is an element in array
    body = doc.querySelectorAll("body >:not(style):not(script)");
    parser = new DOMParser();
    var index = 0;
    //This loop goes through each portion of content between body tag.
    for(var i = 0; i< body.length;i++){
        index = 0;
        //randomizes content that is between each body tag
        change_content(body[i].outerHTML +"</body>",i);
    }
    function change_content(text,j){
        //keeps track of the content
        var array = [];
        //keeps track of the indices of the content
        var array2 = [];
        index = 0;
        var sub = text.substring(text.indexOf(">")+1); 
        var content;
        var tag;
        for(var i = 0; i< text.length;i++){
            
            tag = sub.substring(sub.indexOf("<")+1, sub.indexOf(">")).trim();
            index = text.indexOf(">",index)+1;
            //tells us when we are end of body
            if(tag.localeCompare("/body") == 0){
                break;
            }
            //gets content between tags
            content = sub.substring(0,sub.indexOf("<"));
            if(content.trim() != ""){
            }
            //pushes content into array as long as it isn't between script or style tags, in order to preserve structure
            if(tag.localeCompare("script") != 0 && tag.localeCompare("/script") && tag.localeCompare("style") != 0 && tag.localeCompare("/style") != 0 && content.trim().length >0){
                array.push(content.trim());
                //pushes index of content, so we know where to replace at.
                array2.push(index);
            }
            sub = sub.substring(sub.indexOf(">")+1,); 
        }
        var random;
        for(var i = 0;i<array.length;i++){  
            //gets randomized content
            random = generateString(array[i]);
            //replaces the content with the randomized content at the specifc index
            text =  text.replaceAt(array2[i], random);
        }
    //replace the content at a specific body
    body[j].outerHTML = text; 
    }
    document.getElementById("output").value = doc.querySelectorAll("*")[0].innerHTML;
}

function ClearAll(){
    document.getElementById("input").value = ""
    document.getElementById("output").value = ""
}