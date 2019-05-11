import './App.css'

const App = (props) => (
  <div className="App">
    {props.greetting}
  </div>
)

export default () => <App greeting={'Hello'} />
