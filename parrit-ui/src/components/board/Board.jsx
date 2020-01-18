import React from 'react';
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import ItemTypes from "../../constants/ItemTypes";
import {updatePairingBoardAndTeammates} from "../actions";
import styled from 'styled-components';
import Teammate from "../teammate/Teammate";

const BoardContainer = styled.div`
height: 200px;
width: 300px;
border: 3px solid blue;
`;

export const Board = (props) => {

    const {listOfTeammatesREDUX, updatePairingBoardAndTeammatesREDUX, pairingBoard} = props;

    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE,
        drop(item) {
            const teammate = listOfTeammatesREDUX.find(teammate => teammate.id === item.id);
            updatePairingBoardAndTeammatesREDUX(pairingBoard,teammate);
        }
    });

    return (
        <BoardContainer ref={drop}>
            <p style={{border: "1px solid blue"}}>{props.pairingBoard.title}</p>
            {props.pairingBoard.teammates.length > 0 && props.pairingBoard.teammates.map(people => <Teammate
                key={people.id} teammate={people}/>)}
        </BoardContainer>
    );
};

Board.propTypes = {
  listOfTeammatesREDUX: PropTypes.array.isRequired,
    updatePairingBoardAndTeammatesREDUX: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        listOfTeammatesREDUX: state.listOfTeammates
    }
};
const mapDispatchToProps = {
    updatePairingBoardAndTeammatesREDUX: updatePairingBoardAndTeammates,
};


export default connect(mapStateToProps, mapDispatchToProps)(Board);