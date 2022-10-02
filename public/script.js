const walletId = document.getElementById('wallet_id')
const submitbtn = document.getElementById('submit')
const value = document.getElementById('airdropValue')

const getData = async ()=>{
   const data =  await axios.get('../airdrop1.json')
    
   let initialValue = 0;
    // const total =  Object.values(data.data).reduce((pv,cur)=>{
    //     pv+cur
    // },initialValue)
    const AllDrop = Object.keys(data.data)

    for(const item of Object.values(data.data)){
        if(Number(item) > initialValue){
            initialValue = Number(item)
        }
    }
    console.log(AllDrop)
    submitbtn.addEventListener('click',()=>{
        const id = walletId.value.trim();
        if(!id){
            value.style.fontSize = '1rem'
            return value.innerText = 'kindly input your evmos wallet id'
        }
        const myDrop = AllDrop.find(keys=>keys === id)
        console.log(myDrop,id)
        if(!myDrop){
            value.style.fontSize = '1rem'
            return value.innerText = "You are not qualified for this drop";
        }
        
        value.innerText = `Congrats, You are qualified for the airdrop \
        your allocation is: ${data.data[id]}EVD`

    })
}
walletId.addEventListener('focus', ()=>{
    value.innerHTML = "";
    walletId.innerHTML = "";
})
walletId.focus()
getData()