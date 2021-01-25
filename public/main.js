

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const textbox = document.getElementById("text")
const submitBtn = document.getElementById("submit-btn")

const error = document.getElementById("error")
const success = document.getElementById("success")




submitBtn.addEventListener('click', function(e){
   e.preventDefault()
            console.log("clicked");




let requestServer = true // Default- yes. okay to send to server.

const emailValue= email.value.trim()
const fullnameValue= fullname.value.trim()
const textValue= textbox.value.trim()

// console.log("clicked");
// console.log(e.target.value)
// console.log(fullname.value,email.value, text.value);

//client validation
if(fullnameValue==""){
    setError(fullname,'Please enter your full name')
    setFail(fullname)
    requestServer = false
   
}else{
    setSucess(fullname)

}



if(emailValue=="") {
    setError(email,'Please enter your email address')
    setFail(email)
   requestServer= false
} else if(!isEmail(emailValue)) {
        setError(email,'Email is not valid. Please re-enter your email address')
        setFail(email)
        requestServer = false
} else{

       setSucess(email)

}

if(textValue=="") {
    setError(text,'Please add a contact message')
    setFail(text)
    requestServer = false
   
}else{
    setSucess(text)
}


// send to server
if(requestServer){

        fetch("/contact", {
            method: 'POST',
            body: JSON.stringify( {fullname: fullnameValue,email: emailValue, text: textValue } ),
            headers: {'Content-Type': 'application/json' }

        }).then( (res)=>{
            return res.json()
        }).then(data=>{
            // console.log(data);
           
            let id = data.message._id

        submitOutcome(true,id) 
        //reset inout values
        email.value =""
        fullname.value =""
        text.value=""


        }).catch(err=>{
            console.log(err);
            submitOutcome(false,'Internal error ') 
            
        })  // end of fetch

}




})  // end of submit




//err message
function setError(type,message){
            const element = type.parentElement
            // console.log(type.parentElement);
            const small = element.querySelector('small')
            small.innerHTML = message
        
}

 // add pass to classname -item is now green
function setSucess(type){
    const element = type.parentElement
            element.className = 'form-control success'
      
 }

 // add err to classname -item is now red
 function setFail(type){
    const element = type.parentElement
            element.className = 'form-control error'
      
 }

 //user gets error message on input and then changes the input field- remove error message on tab
 function cleanup(type){
    // console.log("reset");     
      setError(type,'')
    reset(type)


}

  function reset(type){
    const element = type.parentElement
    console.log(element);
            element.className = 'form-control'
      
 }


function isEmail(email) { 
    return  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
} 

//display final success or fail to user
function submitOutcome(status,message){
        if(status){
            success.classList.add('success')
            success.innerHTML = `Your form has been succesfully submitted and we will contact you shortly. ${message}`
                                
          
        } else{
                error.classList.add('error')
                error.innerHTML = `${message} .Please complete all fields and resubmit again`
                

        }    
             

        setTimeout(function() {
                removeStatus()
            }, 8000);         
        

} 

//  remove error or success message
const removeStatus = ()=>{

     error.classList.remove('error');
    success.classList.remove('sucess')
    success.innerHTML = ""
    error.innerHTML = ""
}

