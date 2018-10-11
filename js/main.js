(function() {
var mockupJSON = {
    "owner":
        {
            "id": 1,
            "name": "Hervey Specter",
            "location": "New York, USA",
            "likes": 121,
            "followedBy": 723,
            "followers": 4433,
            "photo": "img/harvey.jpg"
        },
    "comments": [
        {
            "id": 1,
            "name": "Mike Ross",
            "date": 1538670516949,
            "photo": "img/harvey.jpg",
            "comment" : "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula."
        },
        {
            "id": 2,
            "name": "Rechel Zein",
            "date": 1538640216000,
            "photo": "img/harvey.jpg",
            "comment" : "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula."
        },
        {
            "id": 3,
            "name": "Louis Litt",
            "date": 1538670516999,
            "photo": "img/harvey.jpg",
            "comment" : "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula."
        },
        {
            "id": 4,
            "name": "Louis Litt",
            "date": 1538670517000,
            "photo": "img/harvey.jpg",
            "comment" : "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula."
        }
    ]
}

class DataService {
    constructor (){
        this.data = mockupJSON;
    }

    getOwnerPhoto() {
        return this.data.owner.photo;
    }

    getName() {
        return this.data.owner.name;
    }

    getLocation() {
        return this.data.owner.location;
    }

    getFollowedBy() {
        return this.data.owner.followedBy;
    }

    getLikes() {
        return this.data.owner.likes;
    }

    incLikes() {
        ++this.data.owner.likes;
    }

    getFollowers() {
        return this.data.owner.followers;
    }

    incFollowers() {
        ++this.data.owner.followers;
    }

    getComments() {
        return this.data.comments;
    }

    countComments() {
        return (`Hide comments (${this.data.comments.length})`);
    }

    addComment(comment, name, photo) {
        let newComment = {};
        newComment.id = this.data.comments.length + 1;
        newComment.name = name;
        newComment.date = Date.now();
        newComment.photo = photo;
        newComment.comment = comment;
        this.data.comments.push(newComment);
    }
};

function addLike() {
    data.incLikes();
    likes.textContent = data.getLikes();
}

function addFollower() {
    data.incFollowers();
    followers.textContent = data.getFollowers();
}

function updateCommentsNumber() {
    commentsNumber.textContent = data.countComments();
}

function postTimeDifference(commentTimestamp){
    const timeDays = Math.floor((Date.now() - commentTimestamp) / (1000*60*60*24));
    const timeHours = Math.floor((Date.now() - commentTimestamp) / (1000*60*60));
    return Math.floor(timeDays) < 1 ? (`${timeHours} h`) : (`${timeDays}d, ${(timeHours % 24)}h`);
}

function renderComments() {
    updateCommentsNumber();
    let renderComments = data.getComments()
    .sort(sortByDate)
    .map(loop =>
        `<section class="comwdgt-top-comments-content-comment">
            <div class="comwdgt-top-comments-content-comment-header">
                <img src="${loop.photo}"/>
                <span class="comwdgt-top-comments-content-comment-header-name">${loop.name}</span>
                <span class="comwdgt-top-comments-content-comment-header-time">${postTimeDifference(loop.date)}</span>
            </div>
            <div class="comwdgt-top-comments-content-comment-header-txt">${loop.comment}</div>
        </section>`)
    .join('');
    return renderComments;
}

function newComment() {
    const userName = "Pikaczu";
    const userPhoto = "img/pikaczu.jpg";
    const commentText = commentInput.value;
    data.addComment(commentText, userName, userPhoto);
    commentsContent.innerHTML = renderComments();
    scrollCommentsToBottom();
}

function sortByDate(a,b) {
    return a.date - b.date;
}

function hideComments() {
    commentsContent.classList.toggle('comwdgt-top-comments-content-hide');
}

function scrollCommentsToBottom() {
    commentsContent.scroll({
        top: commentsContent.scrollHeight,
        left: 0,
        behavior: "smooth"
    });
}

var data = new DataService();

// initial render of header data and comments
document.write(`
<div id="comments_widget_root">
<div class="comwdgt-bottom-header"></div>
    <div class="comwdgt-top-container">
        <div class="comwdgt-top-header">
            <div class="comwdgt-top-header-link"><a href="#"><img src="img/link.png"/></a></div>
            <div class="comwdgt-top-header-owner">
                <div class="comwdgt-top-header-owner-photo" >
                    <img class="comwdgt-top-header-owner-photo-img" src="${data.getOwnerPhoto()}"/>
                </div>
                <div class="comwdgt-top-header-owner-personal">
                    <span class="comwdgt-top-header-owner-name"></span>
                    <img class="comwdgt-top-header-owner-like" src="img/heart.png"/>
                    <br/>
                    <span class="comwdgt-top-header-owner-location"></span>
                </div>
            </div>
            <div class="comwdgt-top-header-data">
                <div>
                    <p class="comwdgt-top-header-data-likes"></p>
                    <p>Likes</p>
                </div>
                <div>
                    <p class="comwdgt-top-header-data-following"></p>
                    <p>Following</p>
                </div>
                <div>
                    <p class="comwdgt-top-header-data-followers"></p>
                    <p>Followers</p>
                </div>
                <div>
                    <button class="comwdgt-follow-button">FOLLOW</button>
                </div>
            </div>
        </div>
        <div class="comwdgt-top-comments">
            <div class="comwdgt-top-comments-hide">
                <span id="comwdgt-comment-number"></span>
            </div>
            <div class="comwdgt-top-comments-content"></div>
            <div class="comwdgt-top-comments-add">
                <input id="comwdgt-comment-input" type="text" name="comment" placeholder="Add a comment">
                <button id="comwdgt-comment-button">SEND</button>
            </div>
        </div>
    </div>
    </div>
`);

// HTML targets for static data
const name = document.querySelector('.comwdgt-top-header-owner-name');
const home = document.querySelector('.comwdgt-top-header-owner-location');
const following = document.querySelector('.comwdgt-top-header-data-following');

// HTML targets and eventlisteners for dynamic data
const likes = document.querySelector('.comwdgt-top-header-data-likes');
document.querySelector('.comwdgt-top-header-owner-like').addEventListener('click', addLike);

const followers = document.querySelector('.comwdgt-top-header-data-followers');
document.querySelector('.comwdgt-follow-button').addEventListener('click', addFollower);

const commentsContent = document.querySelector('.comwdgt-top-comments-content');
const commentsNumber = document.getElementById('comwdgt-comment-number');
const commentInput = document.getElementById('comwdgt-comment-input');
document.getElementById('comwdgt-comment-button').addEventListener('click', newComment);
document.getElementById('comwdgt-comment-input').addEventListener('keydown', event => { if (event.key == 'Enter') { newComment() }});
document.getElementById('comwdgt-comment-number').addEventListener('click', hideComments);

name.textContent = data.getName();
home.textContent = data.getLocation();
likes.textContent = data.getLikes();
followers.textContent = data.getFollowers();
following.textContent = data.getFollowedBy();
commentsContent.innerHTML = renderComments();
})();