import React from 'react';
import styled from 'styled-components'
import  {Title} from '../../styles/Title'
import {ButtonContainer} from "../../styles/ButtonContainer";
import Button from "../button/Button";
import Board from "../board/Board";

const PairingBoardsContainer = styled.div`
display: flex;
flex-direction: column;
flex: 3;
padding-left: 2rem;
border: 10px solid purple;
`;

const BoardsContainer = styled.div`
flex: 1;
`;

class PairingBoards extends React.Component {

    render() {
        return (
            <PairingBoardsContainer>
                <Title>Pairing Boards</Title>
                <BoardsContainer>
                        <Board/>
                </BoardsContainer>
                <ButtonContainer>
                    <Button text="Add Board"/>
                </ButtonContainer>
            </PairingBoardsContainer>
        )
    }
}

export default PairingBoards