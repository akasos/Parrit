import React, {useState} from 'react';
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import _ from 'lodash';
import ItemTypes from "../../constants/ItemTypes";
import {updatePairingBoardAndTeammates, deletePairingBoard} from "../actions";
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

    const {deletePairingBoard: deletePairingBoardREDUX, listOfTeammatesREDUX, updatePairingBoardAndTeammates: updatePairingBoardAndTeammatesREDUX, pairingBoard} = props;
    const [isShown, setIsShown] = useState(false);

    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE,
        drop(item) {
            const teammate = listOfTeammatesREDUX.find(teammate => teammate.id === item.id);
            updatePairingBoardAndTeammatesREDUX(pairingBoard, teammate);
        }
    });

    function deletePairingBoard() {
        deletePairingBoardREDUX(pairingBoard);
    }

    return (
        <BoardContainer ref={drop} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            <BoardHeaderContainer>
                <p style={{border: "1px solid blue"}}>{props.pairingBoard.title}</p>
                {isShown && _.isEmpty(pairingBoard.teammates) &&
                    <Button onClick={() => deletePairingBoard()} text="X" className="Temp"/>
                }
            </BoardHeaderContainer>
            {pairingBoard.teammates.length > 0 && pairingBoard.teammates.map(people => <Teammate
                key={people.id} teammate={people}/>)}
        </BoardContainer>
    );
};

Board.propTypes = {
    deletePairingBoard: PropTypes.func.isRequired,
    listOfTeammatesREDUX: PropTypes.array.isRequired,
    updatePairingBoardAndTeammates: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        listOfTeammatesREDUX: state.listOfTeammates
    }
};



export default connect(mapStateToProps, {updatePairingBoardAndTeammates, deletePairingBoard })(Board);