let azz=document.querySelectorAll("path");
var div = document.querySelector('.pop');
azz.forEach(item=> {
    item.addEventListener("mouseenter", (e)=> {
        item.style.fill="green";
        div.innerHTML = item.getAttribute("name");
        div.style.opacity="1";
        div.style.marginLeft=`${e.clientX+10}px`;
        div.style.marginTop=`${e.clientY+10}px`;
        console.log(`${e.clientX}`);
    });
    item.addEventListener("mousemove", e=> {
        div.style.marginLeft=`${e.clientX+10}px`;
        div.style.marginTop=`${e.clientY+10}px`;
    });
    item.addEventListener("mouseout", ()=> {
        div.style.opacity="0";
        item.style.fill="#7c7c7c";
        console.clear();
    });
});