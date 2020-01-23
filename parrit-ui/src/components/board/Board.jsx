import React, {useState} from 'react';
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import ItemTypes from "../../constants/ItemTypes";
import {deletePairingBoard, updatePairingBoardAndTeammates, updatePairingBoardTitle} from "../actions";
import styled from 'styled-components';
import Teammate from "../teammate/Teammate";
import Button from "../button/Button";

const BoardContainer = styled.div`
height: 200px;
width: 300px;
border: 3px solid blue;
&:hover {
 background-color: #F6FAE5;
}
`;

const BoardHeaderContainer = styled.div`
display: flex;
justify-content: space-between;
border: 1px solid red;
`;

export const Board = (props) => {

    const {deletePairingBoard: deletePairingBoardREDUX, listOfTeammatesREDUX, numberOfPairingBoards, pairingBoard, updatePairingBoardTitle: updatePairingBoardTitleREDUX, updatePairingBoardAndTeammates: updatePairingBoardAndTeammatesREDUX} = props;
    const [isShown, setIsShown] = useState(false);
    const [isTitleBeingEdited, setIsTitleBeingEdited] = useState(false);
    const [boardTitle, editBoardTitle] = useState('');


    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE,
        drop(item) {
            const teammate = listOfTeammatesREDUX.find(teammate => teammate.id === item.id);
            updatePairingBoardAndTeammatesREDUX(pairingBoard, teammate);
        }
    });

    //TODO: Test this function
    function onInputChange(event) {
        editBoardTitle(event.target.value);
    }

    function deletePairingBoard() {
        deletePairingBoardREDUX(pairingBoard);
    }

    //TODO: TEST INPUT
    function pairingBoardTitle() {
        return isTitleBeingEdited ? <input autoFocus type="text"
                                           value={boardTitle} onChange={onInputChange}
                                           onKeyPress={event => {
                                               if (event.key === "Enter") {
                                                   if (boardTitle !== '') {
                                                       setIsTitleBeingEdited(false);
                                                       updatePairingBoardTitleREDUX({
                                                           id: pairingBoard.id,
                                                           title: boardTitle
                                                       });
                                                   }
                                               }
                                           }}/>
            : <p style={{border: "1px solid blue"}}>{pairingBoard.title}</p>
    }

    function renderBoardOptions() {
        return isShown ? (
            <React.Fragment>
                <Button onClick={() => setIsTitleBeingEdited(true)} text="E" className="Temp"/>
                {numberOfPairingBoards > 1 &&
                <Button onClick={() => deletePairingBoard()} text="X" className="Temp"/>
                }
            </React.Fragment>
        ) : null
    }

    return (
        <BoardContainer ref={drop} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            <BoardHeaderContainer>
                {pairingBoardTitle()}
                {renderBoardOptions()}
            </BoardHeaderContainer>
            {pairingBoard.teammates.length > 0 && pairingBoard.teammates.map(people => <Teammate
                key={people.id} teammate={people}/>)}
        </BoardContainer>
    );
};

Board.propTypes = {
    deletePairingBoard: PropTypes.func.isRequired,
    listOfTeammatesREDUX: PropTypes.array.isRequired,
    updatePairingBoardAndTeammates: PropTypes.func.isRequired,
    updatePairingBoardTitle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        listOfTeammatesREDUX: state.listOfTeammates
    }
};


export default connect(mapStateToProps, {
    deletePairingBoard,
    updatePairingBoardTitle,
    updatePairingBoardAndTeammates
})(Board);