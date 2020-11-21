import React, { Component } from 'react';
import Node from './Node/Node';
import './Game.css';
//import gameplan from '../logic/gameplan';

export default class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            grid : [],
        };
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid}); 
    }


    sendEachPointToNeighbors(node,grid){
        const neighbors=[];
        const { col, row } = node;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
        
        return neighbors;
      
    }




    gameplan(grid,rows,cols,repeat){
        var frst=document.getElementById(`node-${rows}-${cols}`);
        if ( (grid[rows][cols].isPoint === 1) && ((rows === 0 && cols === 0) || (rows ===0 && cols === grid[0].length - 1) || (rows === grid.length - 1 && cols === grid[0].length - 1) || (rows === grid.length - 1 && cols === 0 ))) {
            let points = 2;
            const newGrid = this.getNewGrid2(grid,rows,cols,points,grid[rows][cols].color);
            this.setState({grid:newGrid});
        }    
        else if ( (grid[rows][cols].isPoint === 1) && ((rows ===0 || cols === 0 || rows ===grid.length-1 || cols === grid[0].length - 1))){
            let points = 1;
            //console.log('1 points');
            const newGrid = this.getNewGrid2(grid,rows,cols,points,grid[rows][cols].color);
            this.setState({grid:newGrid});
        }
        let node=grid[rows][cols];
        let colorName=node.color;
        if (node.isPoint <= 3 ){
            var child=document.getElementById(`node-${rows}-${cols}`).lastChild;
            if (child !== null && !repeat){
                let str=child.getAttribute("id");
                colorName = str.charAt(str.length-1);
                //console.log(colorName);
                node.color=colorName;

            }
            
            var scnd = document.createElement('div');
            scnd.setAttribute("id",`point${node.color}`);
            frst.appendChild(scnd); 
            //console.log(node.color);
            setTimeout(()=>{
                document.getElementById(`node-${rows}-${cols}`).className="node split";
                document.getElementById(`point${node.color}`).className=`point${node.color} split`;

            },100);
            
        }
        else if (node.isPoint>=4){
            frst.innerHTML="";
            node.isPoint=0;
            let neighbors=this.sendEachPointToNeighbors(node,grid);
            for (let neighbor of neighbors){
                const {col,row} = neighbor;
                const newGrid = this.getNewGrid2(grid,row,col,1,colorName);
                this.setState({grid:newGrid});
                this.gameplan(grid,row,col,true);
            }

        }
    }



    






    getNewGrid2(grid,row,col,points,colorName){
        const newGrid = grid.slice();
        const node = grid[row][col];
        const newNode = {
            ...node,
            isPoint: node.isPoint+points,
            color:colorName,
        };
        newGrid[row][col]=newNode;
        this.setAllNodesToColors(row,col,colorName);
        return newGrid;
    }

    setAllNodesToColors(rows,cols,colorName){
        var div = document.getElementById(`node-${rows}-${cols}`);
        let totalChild = div.childNodes.length; 
        div.innerHTML="";
        for (let i=0;i<totalChild;i++){
            var child=document.createElement('div');
            child.setAttribute("id",`point${colorName}`);
            div.appendChild(child);
        }
        
    }







    handleMouseClick(col,row){
        const newGrid = getNewGrid(this.state.grid,row,col,0,0);
        //this.setState({grid:newGrid});
        let repeat = false;
        var child = document.getElementById(`node-${row}-${col}`).lastChild;
        //console.log("child",child);
        if (child !== null && child !== undefined){
            //console.log("mayur");
            let str=child.getAttribute("id");
            let colorOfChild = str.charAt(str.length-1);
            //console.log(colorOfChild,newGrid[row][col].color);
            if (Number(colorOfChild) === Number(newGrid[row][col].color)){
                const newGrid = getNewGrid(this.state.grid,row,col,1,1);
                this.setState({grid:newGrid});
                this.gameplan(newGrid,row,col,repeat);
            }
            else{
                
                alert("Cannot place the ball in this box");
            }
        }
        else{
            const newGrid = getNewGrid(this.state.grid,row,col,1,1);
            this.setState({grid:newGrid});
            this.gameplan(newGrid,row,col,repeat);
        }
        
        

      
    }


    render(){
        const {grid} = this.state;
        //console.log(grid);
        return (
            <>
            
                        
        <div className="grid">
            {grid.map((row,rowIdx) => {
                return (
                    <div key={rowIdx}>
                    {row.map((node,nodeIdx) => {
                        const {col,row,isPoint} = node;
                        return(
                         <Node 
                            key={nodeIdx}
                            col={col}
                            row={row}
                            isPoint={isPoint}
                            onMouseDown={(col,row)=>this.handleMouseClick(col,row)}
                            >
                        </Node>
                        );
                    })}
                    </div>
                )
            }
                 
            )}
        </div>
        </>
        );
        
    }
}


const getInitialGrid = () => {
    const grid = [];
    for (let row=0;row<10;row++){
        const currentRow = [];
        for (let col=0;col<10;col++){
            currentRow.push(createNode(col,row));
        }
        //console.log(currentRow);
        grid.push(currentRow);
    }
    console.log(grid);
    return grid;
};

const createNode = (col,row) => {
    return {
        col,
        row,
        isPoint:0,
        color:1,
    };
};

var users=2;
let count = users;

const getNewGrid = (grid,row,col,point,colorName) =>{
    const newGrid = grid.slice();
    const node = grid[row][col];
    if (count===0){
        count=users;
    }
    let colorCount = count;
    if (colorName){
        count--;
    }
    


    const newNode = {
        ...node,
        isPoint: node.isPoint+point,
        color:colorCount,
    };
    newGrid[row][col]=newNode;
    return newGrid;
}