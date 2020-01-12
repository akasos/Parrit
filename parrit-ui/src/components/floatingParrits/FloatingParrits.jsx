import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from "../button/Button";
import Modal from '../../Modal/modal';
import Teammate from "../teammate/Teammate";
import AddTeammate from "../addTeammate/AddTeammate";
import {Title} from "../../styles/Title";
import {ButtonContainer} from "../../styles/ButtonContainer";
import DeleteTeammate from "../deleteTeammate/DeleteTeammate";

const FloatingParritsContainer = styled.div`
display: flex;
flex: 1;
flex-direction: column;
border: 10px solid red;
`;

const TeammatesContainer = styled.div`
flex: 2;
border: 3px solid green;
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
        const { isTeammateBeingAdded } = this.state;
        const { listOfTeammatesREDUX } = this.props;
        return (
            <FloatingParritsContainer>
                <Title>Floating Parrits</Title>
                <TeammatesContainer>
                    {listOfTeammatesREDUX.length > 0 && listOfTeammatesREDUX.filter(people => people.pairingBoard === null).map(people => <Teammate key={people.id} teammate={people} />)}
                </TeammatesContainer>
                <ButtonContainer>
                    <Button className="add-teammate-button" onClick={this.addTeammate} text="Add Person"/>
                    {isTeammateBeingAdded && <Modal className="modal" domElement={document.querySelector("#modal")}><AddTeammate cancel={this.cancelAddingTeammate} /></Modal>}
                    <DeleteTeammate/>
                </ButtonContainer>
            </FloatingParritsContainer>
        );
    }
}

FloatingParrits.propTypes ={
  listOfTeammatesREDUX: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        listOfTeammatesREDUX: state.listOfTeammates
    };
};


export default connect(mapStateToProps)(FloatingParrits);