import React from 'react';
import AppHeader from '../app-header';
import PostAddForm from '../post-add-form';
import PostList from '../post-list';
import PostStatusFilter from '../post-status-filter';
import SearchPanel from '../search-panel';

//styles
import './app.css';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [
                {label: "Going to learn React", important: true, like: false, id: 1},
                {label: "That so good!", important: false, like: false, id: 2},
                {label: "I need a brack...", important: false, like: true, id: 3},
            ],
            term: '',
            filter: 'all'
        };
        this.maxId = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
    }

    filterPost(items, filter){
        if(filter === 'like'){
            return items.filter(item => item.like)
        }
        if(filter === 'important'){
            return items.filter(item => item.important)
        }
        if(filter === 'all'){
            return items
        }
    }

    onFilterSelect(filter){
        this.setState({filter})
    }

    searchPost(items, term){
        if(term.length === 0){
            return items
        }

        return items.filter( (item) => {
            return item.label.indexOf(term) > -1;
        });

    }

    updateSearch(searchQuery){
        this.setState({term:searchQuery});
    }

    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index]; // элемент по которому кликнули
            const newItem = {...old, important : !old.important}; //поменяли статус
            const before = data.slice(0, index); // выбрали все элементы до выделенного
            const after = data.slice(index + 1); // выбрали все элементы после выделенного
            //собрали все элементы воедино и изменённый элемент поставили обратно не его место
            const newArr = [...before, newItem, ...after];
            //вернули новый стейт
            return {
                data : newArr
            }
        })
    }

    onToggleLiked(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id == id);
            const old = data[index];
            const newItem = {...old, like : !old.like};
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, newItem, ...after];
            return {
                data : newArr
            }
        })
    }

    deleteItem (id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];

            return {
                data: newArr
            }
        })
    }

    addItem (body) {
        const newItem = {label: body, id: this.maxId++};
        this.setState(({data}) => {
            const newDate = [...data, newItem];
            return {
                data : newDate
            }
        })
    }

    render(){

        const {data, term, filter} = this.state;

        const allPosts = data.length;
        const likePost = data.filter(item => item.like).length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader likePost={likePost} allPosts = {allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel updateSearch={this.updateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete = {this.deleteItem}
                    onToggleImportant = {this.onToggleImportant}
                    onToggleLiked = {this.onToggleLiked}
                />
                <PostAddForm
                    onAdd = {this.addItem}
                />
            </div>
        );
    }
}