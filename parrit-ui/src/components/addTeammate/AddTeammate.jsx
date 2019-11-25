import React, {Component} from 'react';
import style from 'styled-components'
const ModalContainer = style.div``;
const AddTeamMateContainer = style.div``;
const TitleWrapper = style.div``;
const Title = style.h2``;
const AddTeammateInput = style.input``;
const Button = style.button``;

class AddTeammate extends Component {
    state = {
      name: ''
    };

    onInputChange  = (event) => {
        this.setState({name: event.target.value});
    };

    render() {
        const { cancel } = this.props;
        return (
            <ModalContainer className="ui dimmer modals visible active modal-container" onClick={cancel}>
                <AddTeamMateContainer onClick={(event) => event.stopPropagation()} className="ui standard modal visible active">
                    <TitleWrapper><Title>Add Parrit Teammate</Title></TitleWrapper>
                    <AddTeammateInput className="add-teammate-input" type="text" onChange={this.onInputChange} value={this.state.name}/>
                    <div className ="actions">
                        <Button className="ui primary button">Ok</Button>
                        <Button className="ui button">Cancel</Button>
                    </div>
                </AddTeamMateContainer>
            </ModalContainer>
        );
    }
}

export default AddTeammate;