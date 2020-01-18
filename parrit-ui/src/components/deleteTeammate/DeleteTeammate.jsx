import React from 'react';
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {deleteTeammate} from '../actions';
import styled from 'styled-components';
import ItemTypes from "../../constants/ItemTypes";

const DeleteContainer = styled.div`
width: 50px;
height: 50px;
background-color: blue;
`;

export const DeleteTeammate = (props) => {

    const {deleteTeammateREDUX, listOfTeammatesREDUX} = props;

    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE,
        drop(item) {
            const teammate = listOfTeammatesREDUX.find(teammate => teammate.id === item.id);
            deleteTeammateREDUX(teammate);
        }
    });
    return (
        <DeleteContainer ref={drop}>

        </DeleteContainer>
    );
};

DeleteTeammate.propTypes = {
  deleteTeammateREDUX: PropTypes.func.isRequired,
  listOfTeammatesREDUX: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        listOfTeammatesREDUX: state.listOfTeammates
    }
};

const mapDispatchToProps =  {
    deleteTeammateREDUX: deleteTeammate,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTeammate);
