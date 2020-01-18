import React from 'react';
import styled from "styled-components";
import {useDrop} from "react-dnd";
import * as PropTypes from 'prop-types'
import {connect} from "react-redux";
import _ from 'lodash';
import ItemTypes from "../../constants/ItemTypes";
import Teammate from "../teammate/Teammate";
import {moveTeammateFromPairingBoardToFloatingParrits} from "../actions";

const TeammatesContainer = styled.div`
flex: 2;
border: 3px solid green;
`;

const Teammates = props => {

    const {listOfTeammatesREDUX, moveTeammateFromPairingBoardToFloatingParrits} = props;

    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE,
        drop(item) {
            const teammate = listOfTeammatesREDUX.find(teammate => teammate.id === item.id);
            if (_.isNil(teammate.pairingBoard))
                return;
            moveTeammateFromPairingBoardToFloatingParrits(teammate);
        }
    });

    return (
        <TeammatesContainer ref={drop}>
            {listOfTeammatesREDUX.length > 0 && listOfTeammatesREDUX.filter(people => people.pairingBoard === null).map(people =>
                <Teammate key={people.id} teammate={people}/>)}
        </TeammatesContainer>
    );
};

Teammates.propTypes = {
    listOfTeammatesREDUX: PropTypes.array.isRequired,
    moveTeammateFromPairingBoardToFloatingParrits: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        listOfTeammatesREDUX: state.listOfTeammates,
    }
};
export default connect(mapStateToProps, {moveTeammateFromPairingBoardToFloatingParrits})(Teammates);