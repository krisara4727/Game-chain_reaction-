import Game from '../Game/Game';


function gameplan(grid,rows,cols,repeat){
    var frst=document.getElementById(`node-${rows}-${cols}`);
    if ( (grid[rows][cols].isPoint === 1) && ((rows === 0 && cols === 0) || (rows ===0 && cols === grid[0].length - 1) || (rows === grid.length - 1 && cols === grid[0].length - 1) || (rows === grid.length - 1 && cols === 0 ))) {
        let points = 2;
        const newGrid = this.getNewGrid2(grid,rows,cols,points);
        this.setState({grid:newGrid});
    }    
    else if ( (grid[rows][cols].isPoint === 1) && ((rows ===0 || cols === 0 || rows ===grid.length-1 || cols === grid[0].length - 1))){
        let points = 1;
        console.log('1 points');
        const newGrid = this.getNewGrid2(grid,rows,cols,points);
        this.setState({grid:newGrid});
    }
    let node=grid[rows][cols];
    let colorName;
    if (node.isPoint <= 3 ){
        var child=document.getElementById(`node-${rows}-${cols}`).lastChild;
        if (child !== null && !repeat){
            let str=child.getAttribute("id");
            colorName = str.charAt(str.length-1);
            console.log(colorName);
            node.color=colorName;

        }
        else{
            
        }
        
        var scnd = document.createElement('div');
        
        scnd.setAttribute("id",`point${node.color}`);
        console.log(node.color);
        frst.appendChild(scnd); 
    }
    else if (node.isPoint>=4){
        frst.innerHTML="";
        node.isPoint=0;
        //node.color=colorName;
        let neighbors=sendEachPointToNeighbors(node,grid);
        for (let neighbor of neighbors){
            const {col,row} = neighbor;
            const newGrid = getNewGrid2(grid,row,col,1);
            this.setState({grid:newGrid});
            gameplan(grid,row,col,true);
        }

    }
}


function sendEachPointToNeighbors(node,grid){
    const neighbors=[];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    return neighbors;
  
}

const getNewGrid2 = (grid,row,col,points)=>{
    const newGrid = grid.slice();
    const node = grid[row][col];
    const newNode = {
        ...node,
        isPoint: node.isPoint+points,
    };
    newGrid[row][col]=newNode;
    return newGrid;
}


export default gameplan;