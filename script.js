
    const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
    const dropdown=document.querySelectorAll(".dropdown select");
    const btn=document.querySelector("button");
    const fromCurr=document.querySelector(".from select")
    const toCurr=document.querySelector(".to select")
    const msg=document.querySelector(".msg");


    for(let select of dropdown){
        for(currCode in countryList){
            let newOption=document.createElement("option");
            newOption.innerText=currCode;
            newOption.value=currCode;

            if(select.name==="from" && currCode==="USD"){
                newOption.selected="selected";
            }
            else if(select.name==="to" && currCode==="INR"){
                newOption.selected="selected";
            }
            select.append(newOption);
        }

        select.addEventListener("change",(evt)=>{

            updateFlag(evt.target);

        });
    }

    const updateFlag=(element)=>{
            let currCode=element.value;
            let countryCode=countryList[currCode];
            let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
            let img= element.parentElement.querySelector("img");
            img.src=newsrc;
    };

      

const updateExcahnageRate= async()=>{
    let amount=document.querySelector(" input");
            let  amtVal=amount.value;
            // console.log(amtVal);
           
            if(amtVal===" "|| amtVal<1){
                amtVal=1;
                amount.value="1";
               
            }
            console.log(fromCurr.value,toCurr.value);
            const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
            let response=await fetch(URL);
            let data=await response.json();
            let rate=data[toCurr.value.toLowerCase()];
            console.log(rate);
            let finalAmount=amtVal*rate;
            msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
    }

btn.addEventListener("click", (evt)=>{
            evt.preventDefault();
            updateExcahnageRate();
           
        });
        // on page load call the function to set initial flag and exchange rate
window.addEventListener("load",()=>{
        updateExcahnageRate();

    });
