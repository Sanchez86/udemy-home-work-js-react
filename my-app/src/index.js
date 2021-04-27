import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';

// class WhoAmI extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             speed: 120
//         }
//         this.speedUp = this.speedUp.bind(this);
//     }
//     speedUp(){
//         this.setState(state => ({
//             speed: ++state.speed
//         }))
//     }
//     render(){
//         const {name, age} = this.props;
//         const {speed} = this.state;
//         return (
//             <>
//                 <button onClick={this.speedUp}>Add speed</button>
//                 <h2>My name is {name} and age: {age} speed: {speed}</h2>
//             </>
//         )
//     }
// }

// const App = () => {
//     return(
//         <>
//             <WhoAmI name="Alex" age="35" />
//             <WhoAmI name="Mar" age="29" />
//             <WhoAmI name="Don" age="40" />
//         </>
//     )
// }

ReactDOM.render(<App />,  document.getElementById('root'));

