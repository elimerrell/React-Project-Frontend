import React, { Component } from "react";
import PropTypes from "prop-types";
import Note from "./note";
import Container from "react-bulma-components/lib/components/container";

import Section from "react-bulma-components/lib/components/section";
import Box from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";
import Modal from "react-bulma-components/lib/components/modal";
import NewNote from "./newnote";
import { GithubPicker } from "react-color";

class Notebook extends Component {
  static propTypes = {
    modal: PropTypes.object
  };

  static defaultProps = {
    modal: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: {},
      show: false,
      color: ""
    };
    this.getNotes();
  }

  getNotes = () => {
    const {
      match: { params }
    } = this.props;
    fetch(`http://localhost:3000/api/v1/notebooks/${params.notebookId}/notes`)
      .then(resp => resp.json())
      .then(notes =>
        this.setState({
          notes
        })
      );
  };

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  handleClick = note => {
    this.open();
    this.setState({
      currentNote: note
    });
    console.log(this.state.currentNote);
  };

  mapNotes = () => {
    return this.state.notes.map(note => (
      <Note note={note} handleClick={this.handleClick} />
    ));
  };

  handleChange = ev => {
    const attr = ev.target.name;
    const value = ev.target.value;
    const currentNoteValue = this.state.currentNote;
    currentNoteValue[attr] = value;
    this.setState({ currentNote: currentNoteValue });
  };

  handleColorChange = ev => {
    let note = document.getElementById(this.state.currentNote.id);
    note.style.backgroundColor = ev.hex;
  };

  patchNote = () => {
    const note = this.state.currentNote;
    fetch(
      `http://localhost:3000/api/v1/notebooks/${
        this.state.currentNote.notebook_id
      }/notes/${this.state.currentNote.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
      }
    );
    this.setState({ show: false, currentNote: {} });
  };

  handleSubmit = ev => {
    ev.preventDefauly();
    this.patchNote();
  };

  openModal = () => {
    return (
      <Container>
        <div className="modal-box">
          <Box>
            <form action="submit" onSubmit={this.handleSubmit}>
              <input
                name="title"
                value={this.state.currentNote.title}
                onChange={this.handleChange}
              />
              <textarea
                name="content"
                rows="10"
                cols="70"
                onChange={this.handleChange}
                value={this.state.currentNote.content}
              />
              <GithubPicker onChange={this.handleColorChange} />
              <Button color="info" onClick={this.patchNote}>
                Update
              </Button>
            </form>
          </Box>
        </div>
      </Container>
    );
  };

  render() {
    return (
      <>
        <NewNote />
        <Container>
          <Section>
            <Box>{this.mapNotes()}</Box>
            <Modal
              modal={{ closeOnBlur: true }}
              show={this.state.show}
              onClose={this.close}
            >
              {this.openModal()}
            </Modal>
          </Section>
        </Container>
      </>
    );
  }
}

export default Notebook;
