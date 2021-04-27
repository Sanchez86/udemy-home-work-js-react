import React from 'react';

//styles
import './search-panel.css';
export default class SearchPanel extends React.Component{
    constructor(props){
        super(props);
        /*this.state={
            term : ''
        };*/
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(event){
        const text = event.target.value;
        //this.setState({term});
        this.props.updateSearch(text);
    }

    render(){
        return (
            <input
                onChange={this.onUpdateSearch}
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
            />
        );
    }
}