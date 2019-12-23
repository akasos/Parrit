import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {Title} from '../../styles/Title'
import {ButtonContainer} from "../../styles/ButtonContainer";
import Button from "../button/Button";
import Board from "../board/Board";
import Modal from "../../Modal/modal";
import AddPairingBoard from "../addPairingBoard/AddPairingBoard";

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

export class PairingBoards extends React.Component {
    state = {
        isPairingBoardBeingAdded: false
    };

    addPairingBoard = () => {
        const {isPairingBoardBeingAdded} = this.state;
        this.setState({isPairingBoardBeingAdded: !isPairingBoardBeingAdded})
    };

    cancelAddingPairingBoard = () => {
        this.addPairingBoard();
    };

    render() {
        const {isPairingBoardBeingAdded} = this.state;
        const {listOfPairingBoardsREDUX} = this.props;
        return (
            <PairingBoardsContainer>
                <Title>Pairing Boards</Title>
                <BoardsContainer>
                    {listOfPairingBoardsREDUX.length > 0 && listOfPairingBoardsREDUX.map(pairingBoard => <Board
                        key={pairingBoard.id} pairingBoard={pairingBoard}/>)}
                </BoardsContainer>
                <ButtonContainer>
                    <Button className="add-pairing-board-button" onClick={this.addPairingBoard} text="Add Board"/>
                </ButtonContainer>
                {isPairingBoardBeingAdded &&
                <Modal className="modal" domElement={document.querySelector("#modal")}><AddPairingBoard
                    cancel={this.cancelAddingPairingBoard}/></Modal>}
            </PairingBoardsContainer>
        )
    }
}

PairingBoards.propTypes = {
    listOfPairingBoardsREDUX: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        listOfPairingBoardsREDUX: state.listOfPairingBoards
    }
};

export default connect(mapStateToProps)(PairingBoards);