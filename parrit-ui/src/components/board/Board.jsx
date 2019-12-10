import React from 'react';
import {useDrop} from 'react-dnd'
import ItemTypes from "../../constants/ItemTypes";
import styled from 'styled-components';


const BoardContainer = styled.div`
display: inline-block;
height: 200px;
width: 300px;
border: 3px solid blue;
`;


const Board = (props) => {
    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE
    });
    return (
        <BoardContainer ref={drop}>
            Test
        </BoardContainer>
    );
};

export default Board;