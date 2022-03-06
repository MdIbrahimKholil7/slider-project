
const searchfield=document.getElementById('search-field')
const searchBtn=document.getElementById('search-btn')
const imageContainer=document.getElementById('image-container')
const selectBox=document.querySelector('.select-box')
const createBtn=document.getElementById('create-btn');
const sliderImage=document.querySelector('.slider-img')
const sliderBtn=document.querySelector('.slider-btn')
const KEY = '15674931-a9d714b6e9d654524df198e00&q';
let sliderImg=[]
let changeIndex=0;

// slider section 
const showSlider=(img,elem)=>{
    const elements=elem
    elements.classList.toggle('img-border')
    console.log(elem)
    let imgContain=sliderImg.indexOf(img);
    if(imgContain === -1){
        sliderImg.push(img)
    }else{
        sliderImg.splice(imgContain,1)
    }
    // console.log(sliderImg)
}


// slide select img 
const slideSelectImg=()=>{
    const div=document.createElement('div')
    div.classList.add('slider-parent')
    div.innerHTML=`
        <button id="left-btn" onclick="changeImg(-1)"><i class="fa-solid fa-angle-left"></i></button>
        <button id="right-btn" onclick="changeImg(1)"><i class="fa-solid fa-angle-right"></i></button>
    `
    sliderBtn.appendChild(div)
    sliderImage.appendChild(sliderBtn)
    sliderImage.style.display='block'
    selectBox.style.display='none'
    imageContainer.style.display='none'
    sliderBtn.style.display='block'
    sliderImg.forEach( img => {
        const div=document.createElement('div')
        div.classList.add('img-container')
        div.innerHTML=`
         <img class="img" src="${img}" alt="">
        `
        // console.log(div)
        sliderImage.appendChild(div)
        // console.log(sliderImage)
    })

    let duration=document.getElementById('slider-timing').value || 3000
    if(duration < 0){
        alert('Please enter maximum 1000')
        return
    }
    changeSlider(0)
    let timer=setInterval(()=>{
        changeIndex++
        changeSlider(changeIndex)
    },duration)
}


const changeImg=(index)=>{
    changeIndex+=index
    changeSlider(changeIndex)
}

const changeSlider=index=>{
    console.log(index);
    const items=document.querySelectorAll('.img-container');
    if(index < 0){
        changeIndex=items.length-1
        index=changeIndex
    }
    else if(index >= items.length){
        changeIndex=0
        index=changeIndex
    }

    items.forEach(elem => {
        elem.style.display='none'
    })

    items[index].style.display='block'

    console.log(items)
}


// showing all search image 
const showImage=(data)=>{
    // console.log(data)
    data.map(elem => {
        // console.log(elem)
        const div=document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
            <div class="card">
                <img onclick='showSlider("${elem.previewURL}",this)' class="img-fluid" src="${elem.previewURL}"  alt="...">
            </div>
        `
        imageContainer.appendChild(div)
    })
}
// geting search image 
const getImage=(value)=>{
    const url=`https://pixabay.com/api/?key=${KEY}=${value}&image_type=photo&pretty=true`
    fetch(url)
    .then(res => res.json())
    .then(data =>showImage(data.hits))
    
}

// searching existing input 
searchBtn.addEventListener('click',()=>{
    getImage(searchfield.value)
    selectBox.style.display='block'
})

// create slider 
createBtn.addEventListener('click',()=>{
    slideSelectImg()
})


