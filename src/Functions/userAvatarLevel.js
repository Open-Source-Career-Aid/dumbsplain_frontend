import React from 'react';
export default function userAvatarLevel(score) {
    let level =  score <= 1 ? 1 : score <= 2 ? 2 : score <= 3 ? 3 : score <= 4 ? 4 : score <= 5 ? 5 : 1;
    return `${process.env.PUBLIC_URL}/dumblevel${level}.png`;
}