
document.getElementById('searchBtn').addEventListener('click', function(){

let searchKeyWork = 'bbq'

fetch(`https://videosearch.cognitiveservices.azure.com/bing/v7.0/videos/search?q=${searchKeyWork}&count=1&offset=0&mkt=en-us&safeSearch=Moderate`, {
    headers: {
        "Ocp-Apim-Subscription-Key":"735862a6625b4c65a7fd0c551d621543"
    }
    })
    .then((response) => response.json())
    .then((data) => {
    console.log('Success:', data);
    let newDocument = new DOMParser().parseFromString(data.value[0].embedHtml, 'text/html')
    let urlSource = newDocument.getElementsByTagName('iframe')[0].src
    
    let videoIframe = document.createElement('iframe');

    videoIframe.setAttribute("width",500);
    videoIframe.setAttribute("height",300);
    videoIframe.setAttribute('src',urlSource)
    document.body.appendChild(videoIframe)
    // document.getElementById('videoDiv').setAttribute('src',urlSource)
    // let doc = new DOMParser().parseFromString('<div><b>Hello!</b></div>', 'text/html');
    })
    .catch((error) => {
    console.error('Error:', error);
    });


})