

const inputField=document.getElementById('input-field')
const searchBtn=document.getElementById('search-btn')
const createBtn=document.getElementById('create-btn')
const displayImg=document.getElementById('display-img')
const selectBox=document.getElementById('select-img')
const sliderParent=document.getElementById('slider-parent')
const imageContainer=document.querySelector('.img-container')
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

let imgArr=[]
let index=0





// showing select img
const showSelectImg=()=>{
    sliderParent.style.display='block'
    imageContainer.textContent=''
    const div=document.createElement('div')
    div.classList.add('btn-controller')
    div.innerHTML=`
        <button id="left-btn" onclick="changeImg(-1)"><i class="fa-solid fa-angle-left"></i></button>
        <button id="right-btn" onclick="changeImg(1)"><i class="fa-solid fa-angle-right"></i></button>
    `
    sliderParent.appendChild(div)
    imgArr.forEach(img => {
        const div=document.createElement('div')
        div.classList.add('img')
        div.innerHTML=`
            <img src="${img}" alt="">
        `
        sliderParent.appendChild(div)
    })

    changeSlider(0)
    let timer=setInterval(()=>{
        index++
        changeSlider(index)
    },1000)


}

const changeImg=(num)=>{
    index+=num
    changeSlider(index)
}

const changeSlider=number=>{
    const items=document.querySelectorAll('.img')
    console.log(items,number)
}




const sliderImg=(img,elem)=>{
    elem.classList.toggle('img-border')
    let imgContain=imgArr.indexOf(img)
    if(imgContain === -1){
        imgArr.push(img)
    }else{
        imgArr.splice(imgContain,1)
    }
    console.log(imgArr)
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

createBtn.addEventListener('click',()=>{
   showSelectImg()
})






