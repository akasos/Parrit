import React from 'react';
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux';
import ItemTypes from "../../constants/ItemTypes";
import PropTypes from 'prop-types';
import {upDatePairingBoard, actionRemoveTeammate} from "../actions";
import styled from 'styled-components';
import Teammate from "../teammate/Teammate";

const BoardContainer = styled.div`
height: 200px;
width: 300px;
border: 3px solid blue;
`;

export const Board = (props) => {

    const {listOfTeammatesREDUX} = props;

    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE,
        drop(item) {
            const teammate = listOfTeammatesREDUX.filter(teammate => teammate.id === item.id);
            const pairingBoardId = props.pairingBoard.id;
            const pairingBoard = {
                title: props.pairingBoard.title,
                teammates: [{id: teammate[0].id, name: teammate[0].name}]
            };
            props.upDatePairingBoardREDUX(pairingBoardId, pairingBoard);
            props.removeTeammateREDUX(teammate[0].id);
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



const mapStateToProps = (state) => {
    return {
        listOfTeammatesREDUX: state.listOfTeammates
    }
};
const mapDispatchToProps = {
    upDatePairingBoardREDUX: upDatePairingBoard,
    removeTeammateREDUX: actionRemoveTeammate
};


export default connect(mapStateToProps, mapDispatchToProps)(Board);