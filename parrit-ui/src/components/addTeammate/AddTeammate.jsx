import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {createPerson} from "../actions";
import style from 'styled-components'

const ModalContainer = style.div``;
const AddTeamMateContainer = style.div``;
const TitleWrapper = style.div``;
const Title = style.h2``;
const AddTeammateInput = style.input``;
const Button = style.button``;


export class AddTeammate extends Component {
    constructor(props) {
        super(props);
        this.addTeammate = this.addTeammate.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }
    state = {
        name: ''
    };

    escFunction(event){
        const {cancel} = this.props;
        if(event.keyCode === 27) {
            cancel();
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    onInputChange = (event) => {
        this.setState({name: event.target.value});
    };

    addTeammate() {
        if (this.state.name !== '') {
            this.props.createPerson( this.props.projectId, this.state);
            this.props.cancel();
        }
    };

    render() {
        const {cancel} = this.props;
        return (
            <ModalContainer className="ui dimmer modals visible active modal-container" onClick={cancel}>
                <AddTeamMateContainer onClick={(event) => event.stopPropagation()}
                                      className="ui standard modal visible active">
                    <TitleWrapper><Title>Add Parrit Teammate</Title></TitleWrapper>
                    <AddTeammateInput autoFocus className="add-teammate-input" type="text" onChange={this.onInputChange}
                                      onKeyPress={event => {
                                          if (event.key === "Enter") {
                                              this.onInputChange(event);
                                              this.addTeammate()
                                          }
                                      }}
                                      value={this.state.name}/>
                    <div className="actions">
                        <Button onClick={() => this.addTeammate()}
                                className="ui primary button add-teammate-button">Ok</Button>
                        <Button onClick={cancel} className="ui button cancel-adding-teammate-button">Cancel</Button>
                    </div>
                </AddTeamMateContainer>
            </ModalContainer>
        );
   }
}

AddTeammate.propTypes = {
    cancel: PropTypes.func.isRequired,
    addTeammate: PropTypes.func.isRequired,
    projectId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
      projectId: state.project['id']
  }
};

export default connect(mapStateToProps, { createPerson })(AddTeammate);