import React, {Component} from 'react';
import styled from 'styled-components';
import Button from "../button/Button";
import Modal from '../../Modal/modal';
import AddTeammate from "../addTeammate/AddTeammate";
import {Title} from "../../styles/Title";
import {ButtonContainer} from "../../styles/ButtonContainer";
import DeleteTeammate from "../deleteTeammate/DeleteTeammate";
import Teammates from "../teammates/Teammates";

const FloatingParritsContainer = styled.div`
display: flex;
flex: 1;
flex-direction: column;
border: 10px solid red;
`;
export class FloatingParrits extends Component {
    state = {
        isTeammateBeingAdded: false
    };

    addTeammate = () => {
        const {isTeammateBeingAdded} = this.state;
        this.setState({isTeammateBeingAdded: !isTeammateBeingAdded})
    };

    cancelAddingTeammate = () => {
        this.addTeammate();
    };

    render() {
        const {isTeammateBeingAdded} = this.state;
        return (
            <FloatingParritsContainer>
                <Title>Floating Parrits</Title>
                <Teammates/>
                <ButtonContainer>
                    <Button className="add-teammate-button" onClick={this.addTeammate} text="Add Person"/>
                    {isTeammateBeingAdded &&
                    <Modal className="modal" domElement={document.querySelector("#modal")}><AddTeammate
                        cancel={this.cancelAddingTeammate}/></Modal>}
                    <DeleteTeammate/>
                </ButtonContainer>
            </FloatingParritsContainer>
        );
    }
}

export default FloatingParrits;