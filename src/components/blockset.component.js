import React from "react";

class Blockset extends React.Component{
    constructor(props){
        super(props)

        //blocks order: at index i, the corresponding value is values[blocksOrder[i]]
        this.state = {blocksOrder: []}

        this.handleDragStart = this.handleDragStart.bind(this)
        this.handleDragEnd = this.handleDragEnd.bind(this)
        this.handleDragEnter = this.handleDragEnter.bind(this)
        this.handleDragExit = this.handleDragExit.bind(this)

        this.draggedElement = -1;
        this.dragTarget = -1;
    }

    componentDidMount(){
        for (let i = 0; i < this.props.values.length; i++){
            this.setState((state) => ({
                blocksOrder:
                [
                    ...state.blocksOrder, i
                ]
            }))
        }
    }

    handleDragStart(index){
        this.draggedElement = index;
    }

    handleDragEnd(){
        let newOrder = this.state.blocksOrder;
        let draggedElementContent = newOrder[this.draggedElement]
        newOrder.splice(this.draggedElement, 1);
        newOrder.splice(this.dragTarget, 0, draggedElementContent)
        this.draggedElement = -1;
        this.dragTarget = -1;
        this.setState({
            blocksOrder: newOrder
        })
    }

    handleDragEnter(index){
        this.dragTarget = index;
    }

    handleDragExit(index){
        this.dragTarget = -1;

    }

    render() {
        const orderedValues = this.state.blocksOrder.map((value) => this.props.values[value])
        return(
            <div className = "blockgroup">
                {orderedValues.map((value, index) => <Block value={value} key={index} index={index}
                dragStart = {this.handleDragStart} dragEnd = {this.handleDragEnd}
                dragEnter = {this.handleDragEnter} dragExit = {this.handleDragExit} />)}
            </div>
        )
    };
}

class Block extends React.Component{
    constructor(props){
        super(props)
        this.handleBlockDragStart = this.handleBlockDragStart.bind(this);
        this.handleBlockDragEnd = this.handleBlockDragEnd.bind(this);
        this.handleBlockDragEnter = this.handleBlockDragEnter.bind(this);
        this.handleBlockDragExit = this.handleBlockDragExit.bind(this);
    }
    //create event handlers for onDragStart, onDragEnter, onDragEnd. dragLeave to to reset the border style

    handleBlockDragStart(){
        this.props.dragStart(this.props.index);
    }

    handleBlockDragEnd(){
        this.props.dragEnd();
    }

    handleBlockDragEnter(){
        this.props.dragEnter(this.props.index);
    }

    handleBlockDragExit(){
        this.props.dragExit(this.props.index)
    }
    
    render(){
        return (
            <span className = "blockcontainer" draggable onDragStart={this.handleBlockDragStart}
            onDragEnd={this.handleBlockDragEnd} onDragEnter={this.handleBlockDragEnter}
            onDragExit={this.handleBlockDragExit}>
                <span className = "blocktext">{this.props.value}</span>
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