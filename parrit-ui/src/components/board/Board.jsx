import React, {Component} from 'react';
import styled from 'styled-components';
const BoardContainer = styled.div`
display: inline-block;
height: 200px;
width: 300px;
border: 3px solid blue;
`;


class Board extends Component {
    render() {
        return (
            <BoardContainer>
            </BoardContainer>
        );
    }
}

export default Board;