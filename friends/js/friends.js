const followingListDiv = document.getElementsByClassName('following-list')[0];
const followerListDiv = document.getElementsByClassName('follower-list')[0];
const searchField = document.getElementById('search-field');
const searchIcon = document.getElementsByClassName('search-icon')[0];

getFollowings();
getFollowers();

searchField.onkeydown = e => {
    if (e.key === 'Enter') {
        getSearchResult();
    }
}

searchIcon.onclick = () => {
    getSearchResult();
};

async function getFollowings() {
    try {
        const response = await axios.get(`${BASE_URL}/followings/${userNo}`);
        const followings = response.data;
        for (let following of followings) {

            const friendItem = document.createElement('div');
            friendItem.className = 'friend-item';

            // 프로필 컨테이너를 생성 
            const friendProfileContainer = document.createElement('div');
            friendProfileContainer.className = 'friend-profile-container';

            // 프로필 이미지를 생성 
            const friendImg = document.createElement('div');
            friendImg.className = 'friend-img';
            const img = document.createElement('img');
            img.src = '../image/profile.png';
            friendImg.appendChild(img);

            // 프로필 레이블을 생성 
            const profileLabels = document.createElement('div');
            profileLabels.className = 'profile-labels';

            const friendName = document.createElement('div');
            friendName.className = 'friend-name';
            friendName.textContent = following.user_name;

            const friendId = document.createElement('div');
            friendId.className = 'friend-id';
            friendId.textContent = following.user_id;

            profileLabels.appendChild(friendName);
            profileLabels.appendChild(friendId);

            // 프렌드 인터레스트를 생성 
            const friendInterest = document.createElement('div');
            friendInterest.className = 'friend-interest';
            const friendRecentInterest = await getUsersRecentInterest(following.user_no);
            console.log(friendRecentInterest);
            friendInterest.textContent = friendRecentInterest;

            // 팔로우 버튼을 생성 
            const followButton = document.createElement('button');
            followButton.className = 'follow-button';
            followButton.textContent = '팔로우 취소';

            // 요소를 조합 
            friendProfileContainer.appendChild(friendImg);
            friendProfileContainer.appendChild(profileLabels);

            friendItem.appendChild(friendProfileContainer);
            friendItem.appendChild(friendInterest);
            friendItem.appendChild(followButton);

            // 부모 요소에 추가.
            followingListDiv.appendChild(friendItem);
        }
    } catch (exception) {
        console.error(exception);
    }
}

async function getFollowers() {
    try {
        const response = await axios.get(`${BASE_URL}/followers/${userNo}`);
        const followers = response.data;
        for (let follower of followers) {
            const followers = response.data;

            const friendItem = document.createElement('div');
            friendItem.className = 'friend-item';

            // 프로필 컨테이너를 생성 
            const friendProfileContainer = document.createElement('div');
            friendProfileContainer.className = 'friend-profile-container';

            // 프로필 이미지를 생성 
            const friendImg = document.createElement('div');
            friendImg.className = 'friend-img';
            const img = document.createElement('img');
            img.src = '../image/profile.png';
            friendImg.appendChild(img);

            // 프로필 레이블을 생성 
            const profileLabels = document.createElement('div');
            profileLabels.className = 'profile-labels';

            const friendName = document.createElement('div');
            friendName.className = 'friend-name';
            friendName.textContent = follower.user_name;

            const friendId = document.createElement('div');
            friendId.className = 'friend-id';
            friendId.textContent = follower.user_id;

            profileLabels.appendChild(friendName);
            profileLabels.appendChild(friendId);

            // 프렌드 인터레스트를 생성 
            const friendInterest = document.createElement('div');
            friendInterest.className = 'friend-interest';
            const friendRecentInterest = await getUsersRecentInterest(follower.user_no);
            console.log(friendRecentInterest);
            friendInterest.textContent = friendRecentInterest;

            // 팔로우 버튼을 생성 
            const followButton = document.createElement('button');
            followButton.className = 'follow-button';
            followButton.textContent = '팔로우 취소';

            // 요소를 조합 
            friendProfileContainer.appendChild(friendImg);
            friendProfileContainer.appendChild(profileLabels);

            friendItem.appendChild(friendProfileContainer);
            friendItem.appendChild(friendInterest);
            friendItem.appendChild(followButton);

            // 부모 요소에 추가.
            followerListDiv.appendChild(friendItem);
        }
    } catch (exception) {
        console.error(exception);
    }
}

function getUsersRecentInterest(user_no) {

}


function getSearchResult() {
    const keyword = searchField.value.trim();

    if (keyword === '') {
        alert('검색어를 입력하세요.');
        return;
    }

    window.open(`../search/?keyword=${keyword}`, '_top');
};

async function getUsersRecentInterest(no) {
    let interest = await axios.get(`${BASE_URL}/interest/${no}`)
        .then(response => {
            console.log(response.data[0]);
            return response.data[0].interest_name;
        })
        .catch(error => {
            console.error(error);
        })

    return interest
}