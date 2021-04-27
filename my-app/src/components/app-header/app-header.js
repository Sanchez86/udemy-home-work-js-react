import React from 'react';

//styles
import './app-header.css';

const AppHeader = ({likePost, allPosts}) => {
    return (
        <div className="app-header d-flex">
            <h1>Konev Alex</h1>
            <h2>{allPosts} записей, из них понравилось {likePost}</h2>
        </div>
    )
}

export default AppHeader;