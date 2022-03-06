

const inputField=document.getElementById('input-field')
const searchBtn=document.getElementById('search-btn')
const displayImg=document.getElementById('display-img')
const selectBox=document.getElementById('select-img')
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

let imgArr=[]


const sliderImg=(img,elem)=>{
    elem.classList.toggle('img-border')
    let imgContain=imgArr.indexOf(img)
    if(imgContain === -1){
        imgArr.push(img)
    }else{
        imgArr.splice(imgContain,1)
    }

}


// show image
const showImage=data=>{
    selectBox.style.display='block'
    data.forEach(elem => {
        console.log(elem)
        const div=document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
            <div class="card">
                <img onclick="sliderImg('${elem.previewURL}',this)" src="${elem.previewURL}" class="card-img-top" alt="...">
            </div>
        `
        displayImg.appendChild(div)
    })
}


// load images by api 
const loadImage=()=>{
    const url=`https://pixabay.com/api/?key=${KEY}=${inputField.value}&image_type=photo&pretty=true`
    fetch(url)
    .then(res => res.json())
    .then(data => showImage(data.hits))
}


searchBtn.addEventListener('click',()=>{
    loadImage()
})







