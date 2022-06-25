let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
const alltab = document.getElementById("alltab-btn")
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(myLeads) {
    let listItems = " "
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
        <li> 
            <a target = "_blank" href="${myLeads[i]}">
            ${myLeads[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}


inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        console.log(localStorage.getItem("myLeads"))
    })
})

alltab.addEventListener("dblclick",function(){
    chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
          window.tabs.forEach(function(tab){
            //collect all of the urls here, I will just log them instead
            myLeads.push(tab.url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
            console.log(tab.url);
          });
        });
      });
})
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
