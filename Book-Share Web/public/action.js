let textip = document.getElementById("textip");

let rName = "";

$('.send').on("click",function(){

    rName += (this.nextSibling.nextSibling.innerHTML);

    textip.innerHTML = " <form action='/message' method='post'> " +
                    "<textarea name='msg' rows=3 cols=30 placeholder='Enter message' ></textarea>" +
                    "<input type='hidden' name='rName' value=" + rName + "> " + 
                    "<p><button id='msgdata' class='btn btn-primary msgdata' >Send</button></p>" +
                    "</form>  "
       

    this.parentNode.replaceChild(textip,this);

})
