import React from 'react'
import APIService from '../service/APIService'
export default class Test extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
             foods: []
        }
    }
    
    componentDidMount(){
        APIService.getBooks().then((response) => {
            this.setState({ foods: response.data })
            console.log(this.state.data)
          })
          .catch(function (ex) {
              console.log('Response parsing failed. Error: ', ex);
          });;
    }

    render() {
        return (
          <div>
            {
            this.state.foods.map
            (f =>
            <div key={f.foodId}>
                <h2>{f.name}</h2>
                <h2>{f.img}</h2>
                <h2>{f.price}</h2>
                <h2>{f.size}</h2>
                <h2>{f.category}</h2>
                <h2>{f.inStock}</h2>
                <h2>{f.popular}</h2>
            </div>
            )
            }

          </div>
        )
    }
}
