import 'core-js/stable'
import 'regenerator-runtime/runtime'
import ReactDOM from 'react-dom'
import App from './components/app'
import './style.css'

const element = document.getElementById('app')

ReactDOM.render(<App />, element)
