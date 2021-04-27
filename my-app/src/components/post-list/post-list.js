import React from 'react';
import PostListItem from '../post-list-item';

//styles
import './post-list.scss';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const elements = posts.map(el => {
        const {id, ...elProps} = el; //...elProps - label, important, like

        return (
            <li key={id} className="list-group-item">
                <PostListItem
                    {...elProps}
                    onDelete = {() => onDelete(id)}
                    onToggleImportant = {() => onToggleImportant(id)}
                    onToggleLiked = {() => onToggleLiked(id)}
                />
            </li>
        )
    });

    return (
            <ul className="add-list list-group">
                {elements}
            </ul>    
            )
};

export default PostList;