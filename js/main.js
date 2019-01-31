/*OakleyMK Main JS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// readJsonFile ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function readJsonFile(file,cbf){
  var rqst=new XMLHttpRequest();
  rqst.overrideMimeType("application/json");
  rqst.open("GET",file,true);
  rqst.onreadystatechange=function(){
    if(rqst.readyState===4&&rqst.status=="200"){
      try{cbf(rqst.responseText);}catch(e){console.log(e);}
    }
  }
  rqst.send(null);
}

// clearItems ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function clearItems(){if(document.loaded){
  document.getElementsByClassName("container")[0].innerHTML="";

}}

// buildItems ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function buildItems(data){if(document.loaded){
  clearItems();
  var i;for(i in data){
    var obj=document.createElement("div");obj.setAttribute("id","item_"+(parseInt(i)+1));obj.classList.add("item");
    obj.innerHTML+="<div class=\"boxtop\"><img class=\"g_img\" src=\"./images/grocery/"+data[i].category.toCamelCase()+"/"+data[i].item.toCamelCase()+"_"+(data[i].brand+" "+data[i].type).toCamelCase()+".png\" alt=\""+data[i].item+" - "+data[i].brand+" - "+data[i].type+"\"><span class=\"g_qty\">"+data[i].qty+"</span></div>";
    obj.innerHTML+="<div class=\"boxmid\"><div class=\"g_label\">"+data[i].item+"</div><hr class=\"g_hr\"><span class=\"g_brand\">"+data[i].brand+"</span><span class=\"g_type\">"+data[i].type+"</span></div>";
    obj.innerHTML+="<div class=\"boxbot\"><div class=\"g_category\">"+data[i].category+"</div></div>";
    document.getElementsByClassName("container")[0].appendChild(obj);
  }
}}

function filterItems(ftype){if(document.loaded){
  var filter=document.getElementsByClassName("filter-field")[0].value;

  var fdata=document.data.filter(function(data){
    return data.item.toLowerCase().includes(filter.toLowerCase()) ||
      data.brand.toLowerCase().includes(filter.toLowerCase()) ||
      data.type.toLowerCase().includes(filter.toLowerCase()) ||
      data.category.toLowerCase().includes(filter.toLowerCase()) ||
      data.qty.toString().includes(filter)
  });
  console.log(fdata);
  buildItems(fdata);
}}




function filterEnter(e){
  e=window.event||e;e=e.which||e.keyCode;
  if(e==13){
    filterItems();
    document.getElementsByClassName("filter-field")[0].blur();
  }
};

function filterFieldFocus(){if(document.loaded){
  document.getElementsByClassName("container")[0].classList.add("blur");
  document.getElementsByClassName("umbrella")[0].classList.add("dim");
}}

function filterFieldBlur(){if(document.loaded){
  document.getElementsByClassName("container")[0].classList.remove("blur");
  document.getElementsByClassName("umbrella")[0].classList.remove("dim");
}}



function backToTop() {
  document.getElementsByClassName("main")[0].scrollTop=0;
}


// .toCamelCase() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function toCamelCase(str){return str.replace(/[^0-9a-z]/ig," ").replace(/\s+(.)/g,function($1){return $1.toUpperCase();}).replace(/\s/g,"").replace(/^(.)/,function($1){return $1.toLowerCase();});}
String.prototype.toCamelCase=function(){return toCamelCase(String(this))}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// onload ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.onload=function(){document.loaded=true;
  //if(!document.body){document.body=document.getElementsByTagName("body")[0]}

  // add Event Listener ~~~~~~~
  window.addEventListener("resize",windowOnResize);
  document.getElementsByClassName("main")[0].addEventListener("scroll",windowOnscroll);
  document.getElementsByClassName("filter-field")[0].addEventListener("focus",filterFieldFocus);
  document.getElementsByClassName("filter-field")[0].addEventListener("blur",filterFieldBlur);
  setTimeout(function(){window.dispatchEvent(new Event("resize"));},500);

  // fetch data ~~~~~~~~~~~~~~~
  readJsonFile("./data/grocery.json",function(file){
      document.data=JSON.parse(file).data;
      console.log(document.data);
      buildItems(document.data);
  });

  // test/debug ~~~~~~~~~~~~~~~



}

// onResize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function windowOnResize(){if(document.loaded){
  //console.log("Resize!");
  document.getElementsByTagName("header")[0].style.width=document.getElementsByClassName("container")[0].offsetWidth+"px";
  document.getElementsByClassName("header-spacer")[0].style.height=(document.getElementsByTagName("header")[0].offsetHeight)+"px";
  document.getElementsByTagName("footer")[0].style.width=document.getElementsByClassName("container")[0].offsetWidth+"px";
  document.getElementsByClassName("footer-spacer")[0].style.height=(document.getElementsByTagName("footer")[0].offsetHeight)+"px";

}}

// onScroll ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function windowOnscroll(){if(document.loaded){
  //console.log("Scroll!");

  if(document.getElementsByClassName("main")[0].scrollTop>60){
    //console.log("fadein!");
    document.getElementsByClassName("backToTop-button")[0].classList.remove("fadeout");
    document.getElementsByClassName("backToTop-button")[0].classList.add("fadein");
  } else if(document.getElementsByClassName("main")[0].scrollTop<=60){
    //console.log("fadeout!");
    document.getElementsByClassName("backToTop-button")[0].classList.add("fadeout");
    document.getElementsByClassName("backToTop-button")[0].classList.remove("fadein");
  }



}}