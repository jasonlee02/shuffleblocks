import React from "react";

class Blockset extends React.Component{
    constructor(props){
        super(props)
        this.state = {blocksOrder: []}
        this.handleDrag = this.handleDrag.bind(this)
    }

    componentDidMount(){
        for (let i = 0; i < this.props.values.length; i++){
            this.setState((state) => ({
                blocksOrder:
                [
                    ...this.state.blocksOrder, i
                ]
            }))
        }
    }

    handleDrag(){

    }

    render() {
        return(
            <div class = "blockgroup">
                {this.props.values.map((value, index) => <Block value={value} key={index} onDrag = {this.handleDrag}/>)}
            </div>
        )
    };
}

class Block extends React.Component{
    constructor(props){
        super(props)
    }

    handleBlockDrag(){
        this.props.handleDrag();
    }
    
    render(){
        return (
            <span class = "blockcontainer" onDrag = {this.handleBlockDrag}>
                <text class = "blocktext">{this.props.value}</text>
            </span>
        );
    }
}

export default Blockset;

//design:
/*
    1 blockset object
    state: list of positions of the block objects

    5 block objects
    props: the text to be listed in the block
*/