import React, {Component} from 'react';

import './post-list-item.scss';

const PostListItem = ({label, important, like, onDelete, onToggleImportant, onToggleLiked}) => {

        let classNames = "app-list-item d-flex justify-content-between";
        if (important) classNames += ' important';

        if (like) classNames += ' like';

        return (
            <div className={classNames}>
                <span className="app-list-item-label" onClick={onToggleLiked}>
                    {label}
                </span>
                <div className="d-flex justify-content-center align-item-center">
                    <button 
                        type="button"
                        className="btn-star btn-sm"
                        onClick={onToggleImportant}>
                        <i className="fas fa-star"></i>
                    </button>
                    <button
                        type="button"
                        className="btn-trash btn-sm"
                        onClick={onDelete}>
                        <i className="fas fa-trash-o"></i>
                    </button>
                    <i className="fas fa-heart"></i>
                </div>
            </div>
        )

}

export default PostListItem;