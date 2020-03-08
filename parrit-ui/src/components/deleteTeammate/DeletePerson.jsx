import React from 'react';
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {deletePerson} from '../actions';
import styled from 'styled-components';
import ItemTypes from "../../constants/ItemTypes";

const DeleteContainer = styled.div`
width: 50px;
height: 50px;
background-color: blue;
`;

export const DeletePerson = (props) => {

    const {deletePersonREDUX, projectIdREDUX} = props;

    const [, drop] = useDrop({
        accept: ItemTypes.TEAMMATE,
        drop(item) {
            deletePersonREDUX(projectIdREDUX, item.id)
        }
    });
    return (
        <DeleteContainer ref={drop}>

        </DeleteContainer>
    );
};

DeletePerson.propTypes = {
    deletePersonREDUX: PropTypes.func.isRequired,
    projectIdREDux: PropTypes.number.isRequired
};

const mapStateToProps = state => {
    return {
        projectIdREDUX: state.project['id']
}
};

const mapDispatchToProps = {
    deletePersonREDUX: deletePerson,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePerson);
