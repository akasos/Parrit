import React from 'react';
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux';
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
            const teammate = listOfTeammatesREDUX.filter(teammate => teammate.id === item.id);
                const updatedPairingBoard = {
                    title: pairingBoard.title,
                    teammates: [{id: teammate[0].id, name: teammate[0].name}]
                };
                updatePairingBoardAndTeammatesREDUX(pairingBoard.id, updatedPairingBoard, teammate[0]);
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
    updatePairingBoardAndTeammatesREDUX: updatePairingBoardAndTeammates,
};


export default connect(mapStateToProps, mapDispatchToProps)(Board);