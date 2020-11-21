import React, { Component } from 'react';
import './Node.css';


export default class Node extends Component{
    render(){
        const {
            col,
            row,
            //isPoint,
            //color,
            onMouseDown,
        }=this.props;
    return (
        <>
        <div  id={`node-${row}-${col}`} 
        className={`node`} 
        onMouseDown={()=>onMouseDown(col,row)}
        >
        </div>
        </>
    );
    }
}