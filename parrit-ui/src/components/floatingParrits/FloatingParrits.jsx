import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Modal from '../../modal';

const FloatingParritsContainer = styled.div``;
const Title = styled.h3``;
const PersonListContainer = styled.div``;
const ButtonContainer = styled.div``;
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
                <PersonListContainer>
                    {listOfTeammatesREDUX.length > 0 &&  listOfTeammatesREDUX.map(people => <div key={people.id}>{people.name}</div>)}
                </PersonListContainer>
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