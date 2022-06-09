//fetching images from unsplash api

const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let imageArray=[];

const apiKey='PnqGZi0LAcf8XOs0dhjxZEbg5jbNzp2vIHDSFqCcy8M';
const apiURL=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=3`;

//helper function to set attributes on DOM elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//elements for links,photos add to DOM
function displayImages(){
    imageArray.forEach((image)=>{
        //anchor element to link to unsplash
        const item=document.createElement('a'); //creates blank anchor element
        // item.setAttribute('href',image.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href: image.links.html,
            target: '_blank',
        });
        //image element for image
        const img=document.createElement('img');
        // img.setAttribute('src',image.urls.regular);
        // img.setAttribute('alt',image.alt_description);
        // img.setAttribute('title',image.alt_description);
        setAttributes(img,{
            src: image.urls.regular,
            alt: image.alt_description,
            title: image.alt_description,
        });
        //put image tag inside anchor element, both in image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function fetchImages(){
    try{
        const resp=await fetch(apiURL);
        imageArray=await resp.json();
        displayImages();
        //console.log(imageArray);
    } catch(error){
        console.log(error);
    }
}

//scrolling event listener, load more images before reaching end of page
window.addEventListener('scroll',()=>{
    // console.log('scrolled');
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000){
        fetchImages();
        console.log('fetch more images . . .');
    } 
});

fetchImages();