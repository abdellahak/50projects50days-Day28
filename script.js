let search = document.querySelector('.search');
let githubCard = document.querySelector('.githubCard');
let searchBtn = document.querySelector('.search-icon');
let noUser = document.querySelector('.noUser');
// githubCard info :

let avatar = document.querySelector('.profilePhoto');
let userName = document.querySelector('.userName')
let bio = document.querySelector('.bio');
let followers = document.querySelector('.followers');
let following = document.querySelector('.following');
let repositories = document.querySelector('.repositories');
let visitProfile = document.querySelector('.visit');
let repos = document.querySelector('.repos');

searchBtn.addEventListener('click',getProfile);
search.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        getProfile(true);
    }
})
getProfile(false);
function getProfile(condition= true){
    noUser.style.display ="none";
    if(search.value.trim() != "" ){
        user = search.value.trim();
        fetch(`https://api.github.com/users/${user}`)
            .then(response => {
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data=>{
                avatar.src = data.avatar_url;
                userName.innerText = data.name;
                bio.innerText = data.bio;
                followers.innerText =data.followers;
                following.innerText =data.following;
                repositories.innerText =data.public_repos;
                visitProfile.href = data.html_url;
                // fetch repos
                fetch(`https://api.github.com/users/${user}/repos`)
                .then(response2 => {
                    if(!response2.ok){
                        throw new Error('Network response was not ok');
                    
                    }
                    return response2.json();
                }).then(respdata =>{
                    respdata.sort((x,y)=>{
                        let date1 = new Date(x.created_at);
                        let date2 = new Date(y.created_at);
                        return date2 - date1;
                    })
                    respdata = respdata.slice(0,5);
                    resHtmlContent = respdata.map(element=>{
                        responame = element.name;
                        if(responame.length>10){
                            responame = '...'+responame.slice(-11);
                        }
                        return `<a class="repo" href="${element.html_url}" target="_blank">${responame}</a>`;
                    } 
                    ).join('');
                    repos.innerHTML = resHtmlContent;
                })
                githubCard.style.display ='block';
            }).catch(error=>{
                noUser.style.display ="block";
            })
            
        }else{
            if(condition){
                alert('Enter a github user');
            }
    }
}