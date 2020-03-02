import React from 'react';
import styled from "styled-components";
import {useDrop} from "react-dnd";
import * as PropTypes from 'prop-types'
import {connect} from "react-redux";
import _ from 'lodash';
import ItemTypes from "../../constants/ItemTypes";
import Teammate from "../teammate/Teammate";
import {moveTeammateFromPairingBoardToFloatingParrits} from "../actions";
import {project} from "../reducers";

const TeammatesContainer = styled.div`
flex: 2;
border: 3px solid green;
`;

const Teammates = props => {

    const {listOfPeopleREDUX, moveTeammateFromPairingBoardToFloatingParrits} = props;

    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE,
        drop(item) {
            const teammate = listOfPeopleREDUX.find(teammate => teammate.id === item.id);
            if (_.isNil(teammate.pairingBoard))
                return;
            moveTeammateFromPairingBoardToFloatingParrits(teammate);
        }
    });

    return (
        <TeammatesContainer ref={drop}>
            {listOfPeopleREDUX.length > 0 && listOfPeopleREDUX.map(people =>
                <Teammate key={people.id} teammate={people}/>)}
        </TeammatesContainer>
    );
};

Teammates.propTypes = {
    listOfPeopleREDUX: PropTypes.array.isRequired,
    moveTeammateFromPairingBoardToFloatingParrits: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        listOfPeopleREDUX: _.isEmpty(state.project) ? [] : state.project['people']
    }
};
export default connect(mapStateToProps, {moveTeammateFromPairingBoardToFloatingParrits})(Teammates);