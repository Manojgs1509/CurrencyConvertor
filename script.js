const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button")
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")




for (let select of dropdown) {
    for ( currCode in countryList) {
        
        let newOption=document.createElement("option");
        newOption.innerText=currCode
        newOption.value=currCode

        if(select.name === "from" && currCode === "USD"){
            
            newOption.selected="selected"
        }else  if(select.name === "to" && currCode === "INR"){
            
            newOption.selected="selected"
        }

        select.append(newOption)
    }

    select.addEventListener("change",(evt)=>{
        
         updateFlag(evt.target)
     })

  }



  btn.addEventListener("click", (evt)=>{
     evt.preventDefault()
     updateExchangeRate();
  })

  window.addEventListener("load",(evt)=>{
    evt.preventDefault()
    updateExchangeRate()
  })


  const updateExchangeRate=async ()=>{

       let amount=document.querySelector(".amount input")
       let amountVal=amount.value
       
       if(amountVal === 0 || amountVal < 0){
          amountVal=1;
          amount.value="1";
       }

       const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
       let response= await fetch(URL)
       let data=await response.json()
       let rate=data[tocurr.value.toLowerCase()]

       let finalAmount=rate * amountVal;

       msg.innerText=`${amountVal} ${fromcurr.value} =  ${tocurr.value} ${finalAmount} `



  }

  const updateFlag=(element) => {

       let code=element.value;
       let countryCode=countryList[code];
       let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
       let img=element.parentElement.querySelector("img");
       img.src=newSrc
       
  }

