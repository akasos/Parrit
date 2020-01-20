import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { removeTeammatesFromPairingBoard } from "../actions";
import styled from "styled-components";
import ButtonsContainer from "../../styles/ButtonsContainer";
import Button from '../button/Button'


const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: Yellow;
`;

const ProjectName = styled.h2`
flex: 2;
margin: 0 0 0 16px;
border: 1px solid red;
`;


export function SubHeader(props) {

    const { projectName, removeTeammatesFromPairingBoard } = props;

    function resetPairs(){
        removeTeammatesFromPairingBoard();
    }
    return (
        <SubHeaderContainer>
            <ProjectName>{projectName}</ProjectName>
            <ButtonsContainer>
                <Button className="reset-button" onClick={() => resetPairs()} text="Reset Pairs"/>
                <Button className="temp" onClick={() => null} text="Recommend Paris"/>
                <Button className="temp" onClick={() => null} text="Record Paris"/>
            </ButtonsContainer>
        </SubHeaderContainer>
    )
}

SubHeader.propTypes = {
   projectName: PropTypes.string.isRequired,
    removeTeammatesFromPairingBoard: PropTypes.func.isRequired
};

export default connect(null, {removeTeammatesFromPairingBoard})(SubHeader)