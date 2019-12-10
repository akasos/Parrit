import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Modal from '../../modal';
import Teammate from "../teammate/Teammate";
import {Title} from "../../styles/Title";
import {ButtonContainer} from "../../styles/ButtonContainer";

const FloatingParritsContainer = styled.div`
display: flex;
flex: 1;
flex-direction: column;
border: 10px solid red;
`;

const TeammatesContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
border: 3px solid green;
`;

export const AddTeammateButton = styled.button``;

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
                    {listOfTeammatesREDUX.length > 0 && listOfTeammatesREDUX.map(people => <Teammate key={people.id} teammate={people}/>)}
                </TeammatesContainer>
                <ButtonContainer>
                    <AddTeammateButton className="add-teammate-button" onClick={this.addTeammate}>Add Person</AddTeammateButton>
                    {isTeammateBeingAdded && <Modal className="modal" cancel={this.cancelAddingTeammate}/>}
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