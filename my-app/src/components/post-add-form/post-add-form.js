import React from 'react';

//styles
import './post-add-form.css';

export default class PostAddForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            placeholder: 'О чём вы думаете сейчас???',
            buttonText: 'Добавить'
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    //получаю текст с value и устанавливаю этот текст в стейте
    onValueChange(event){
        this.setState({
            text : event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault();

        const text = this.state.text;
        if(text.length > 0){
            this.props.onAdd(this.state.text);
            this.setState({
                text: '',
                placeholder: 'Хотити ввести что-то ещё?',
                buttonText: 'Добавить ещё'
            });
        }else{
            this.setState({
                placeholder: 'Вы должны что-то ввести. Пустое поле не отправиться'
            })
        }
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className="bottom-panel d-flex">
                <input
                    onChange={this.onValueChange}
                    value={this.state.text}
                    type="text"
                    placeholder={this.state.placeholder}
                    className="form-control new-post-label"/>
                <button
                    type="submit"
                    className="btn btn-outline-secondary">{this.state.buttonText}</button>
            </form>
        )
    }
}