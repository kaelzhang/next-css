import './App.css'

const App = (props) => (
  <div className="App">
    {props.greetting}
  </div>
)

export default () => <App greeting={'Hello'} />


// class IndexPage extends Component {
//   static getInitialProps ({query}) {
//     const {
//       lang = 'default'
//     } = query

//     return {
//       lang
//     }
//   }

//   render () {
//     return (
//       <App lang={this.props.lang}/>
//     )
//   }
// }
