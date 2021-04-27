import React from 'react';

//styles
import './post-status-filter.css';

export default class PostStatusFilter extends React.Component{
    constructor(props){
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'},
            {name: 'important', label: 'Избранные'}
        ]
    }

    render(){

        const buttons = this.buttons.map(({name, label}) => {
            const active = this.props.filter === name;
            const classs = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button onClick={() => this.props.onFilterSelect(name)} type="button" key={name} className={`btn ${classs}`}>{label}</button>
            );
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}