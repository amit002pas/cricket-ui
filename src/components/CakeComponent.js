import React from 'react'
import {buyCake} from '../action/cakeActions'
import {connect} from 'react-redux'

class CakeComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
            <h2>No. of Cakes {this.props.numOfCakes}</h2>
            <button onClick={this.props.buyCake}>Buy Cake</button>
            </div>

        )
    }

    
}   
 const mapStateToProps=(state)=>{
    return{
    numOfCakes:state.numOfCakes
    }
}

 const mapDispatchToProps=dispatch=>{
    return{
        buyCake:()=>dispatch(buyCake())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CakeComponent);