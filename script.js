let tbefore=new Date,tafter=new Date,div;
let money={
    amount:0.0001,
    display:document.getElementById("moneydis"),
    perSec:0,
    persecDisplay:document.getElementById("monpersecdis"),
}
let energy={
    generator:document.getElementById("generate"),
    increment:1,
    amount:0,
    display:document.getElementById("energy"),
    perSec:0,
    persecDisplay:document.getElementById("enerpersecdis"),
    conversionSpeed:0,
    price:0.01,
    conversionSpeedDisplay:document.getElementById("conversionSpeed"),
    priceDisplay:document.getElementById("conversionRate")
}
let shop={
    converter:{
        button:document.getElementById("converter"),
        costDisplay:document.getElementById("contxt3"),
        amountDisplay:document.getElementById("contxt4"),
        cost:0,
        amount:0
    },
    generator:{
        button:document.getElementById("energyb"),
        costDisplay:document.getElementById("enertxt3"),
        amountDisplay:document.getElementById("enertxt4"),
        cost:0.5,
        amount:0
    },
    coingen:{
        button:document.getElementById("moneyb"),
        costDisplay:document.getElementById("montxt3"),
        amountDisplay:document.getElementById("montxt4"),
        cost:20,
        amount:0
    },
}
// if(localStorage.getItem("money")!=undefined){
//     money=JSON.parse(localStorage.getItem("money"))
//     money.display=document.getElementById("moneydis")
//     money.persecDisplay=document.getElementById("monpersecdis")
// }
function sleep(i){
    let t=new Date,t2=new Date
    while(t.getTime()>t2.getTime()-i){
        t2=new Date;
    }
}
function frame(){
    // localStorage.setItem("money",JSON.stringify(money))
    tbefore=tafter
    tafter=new Date
    div=(tafter.getTime()-tbefore.getTime())/1000
    energy.amount+=energy.perSec*div
    money.amount+=money.perSec*div
    if(energy.amount>energy.conversionSpeed*div){
        energy.amount-=energy.conversionSpeed*div
        money.amount+=energy.conversionSpeed*energy.price*div
    }
    else{
        if(energy.amount!=0){
            money.amount+=energy.amount*energy.price
            energy.amount=0
        }
    }
    energy.priceDisplay.textContent=`Energy price: ${energy.price} Coins`
    energy.conversionSpeedDisplay.textContent=`Energy conversion speed: ${energy.conversionSpeed} Energy/sec`
    energy.display.textContent=`${(Math.floor((energy.amount)*100)/100).toFixed(2)} Energy`;
    money.display.textContent=`${(Math.floor((money.amount)*100)/100).toFixed(2)} Coins`;
    energy.persecDisplay.textContent=`${(Math.floor((energy.perSec)*100)/100).toFixed(2)}/Sec`
    money.persecDisplay.textContent=`${(Math.floor((money.perSec)*100)/100).toFixed(2)}/Sec`
    shop.converter.costDisplay.textContent=`Cost: ${(Math.floor((shop.converter.cost)*100)/100).toFixed(2)} Coins`
    shop.generator.costDisplay.textContent=`Cost: ${(Math.floor((shop.generator.cost)*100)/100).toFixed(2)} Coins`
    shop.coingen.costDisplay.textContent=`Cost: ${(Math.floor((shop.coingen.cost)*100)/100).toFixed(2)} Coins`
    shop.converter.amountDisplay.textContent=`Amount: ${shop.converter.amount}`
    shop.generator.amountDisplay.textContent=`Amount: ${shop.generator.amount}`
    shop.coingen.amountDisplay.textContent=`Amount: ${shop.coingen.amount}`
}
energy.generator.addEventListener("click",()=>{
    energy.amount+=energy.increment;
})
shop.converter.button.addEventListener("click",()=>{
    if(money.amount>=shop.converter.cost){
        shop.converter.amount++;
        money.amount-=shop.converter.cost
        energy.conversionSpeed+=0.5
        shop.converter.cost=0.01*Math.pow(1.45,shop.converter.amount/1.2)
        shop.converter.cost=Math.floor((shop.converter.cost)*100)/100
    }
})
shop.generator.button.addEventListener("click",()=>{
    if(money.amount>=shop.generator.cost){
        shop.generator.amount++;
        money.amount-=shop.generator.cost
        energy.perSec+=1
        shop.generator.cost=0.5*Math.pow(1.65,shop.generator.amount/1.1)
        shop.generator.cost=Math.floor((shop.generator.cost)*100)/100
    }
})
shop.coingen.button.addEventListener("click",()=>{
    if(money.amount>=shop.coingen.cost){
        shop.coingen.amount++;
        money.amount-=shop.coingen.cost
        money.perSec+=0.1
        shop.coingen.cost+=0.01;
        shop.coingen.cost*=1.75;
        shop.coingen.cost=Math.floor((shop.coingen.cost)*100)/100
    }
})
setInterval(frame, 20);
