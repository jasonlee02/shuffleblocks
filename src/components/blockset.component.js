import React from "react";

class Blockset extends React.Component{
    constructor(props){
        super(props)

        //blocks order: at index i, the corresponding value is values[blocksOrder[i]]
        this.state = {blocksOrder: [],
                      highlighted: -1}

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
        if (this.draggedElement === -1 || this.dragTarget === -1){
            this.setState({highlighted: -1});
            return;
        }
        let newOrder = this.state.blocksOrder;
        let draggedElementContent = newOrder[this.draggedElement]
        newOrder.splice(this.draggedElement, 1);
        newOrder.splice(this.dragTarget, 0, draggedElementContent)
        this.draggedElement = -1;
        this.dragTarget = -1;
        this.setState({
            blocksOrder: newOrder,
            highlighted: -1
        })
    }

    handleDragEnter(index){
        this.dragTarget = index;
        this.setState({highlighted: index});
    }

    handleDragExit(){
        this.dragTarget = -1;
        this.setState({highlighted: -1});
        //include highlighting while drag in the state?
    }

    render() {
        const orderedValues = this.state.blocksOrder.map((value) => this.props.values[value])
        return(
            <div className = "blockgroup">
                {orderedValues.map((value, index) => <Block value={value} key={index} index={index}
                dragStart = {this.handleDragStart} dragEnd = {this.handleDragEnd}
                dragEnter = {this.handleDragEnter} dragExit = {this.handleDragExit} 
                highlight = {this.state.highlighted === index ? true : false}/>)}
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
        this.props.dragExit()
    }
    
    render(){
        return (
            <span className = {`blockcontainer ${this.props.highlight ? 'highlighted' : ''}`} draggable onDragStart={this.handleBlockDragStart}
            onDrop={this.handleBlockDragEnd} onDragEnter={this.handleBlockDragEnter} onDragOver={(e) => {e.preventDefault()}}
            onDragExit={this.handleBlockDragExit}>
                <span className = "blocktext">{this.props.value}</span>
            </span>
        );
    }
}

export default Blockset;