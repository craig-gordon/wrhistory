import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

// import GamePreviewButton from '../../common/GamePreviewButton.jsx';
import StandardButton from '../../common/StandardButton.jsx';
import { PageHeader } from '../../common/styledComponents.js';

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;

class BrowseGamesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      documents: [{title: 'Mega Man 2', abbrev: 'mm2', category: 'Any%', type: 'speedrun'}]
    }
  }

  componentDidMount() {
    axios.get('/api/browseGames/allDocuments')
      .then(res => {
        console.log('response:', res);
        let documents = res.data;
        // this.setState({documents});
      })
      .catch(err => {
        console.log('Error retrieving Document from database:', err);
      });
  }

  render() {
    let allButtons = this.state.documents.map((doc, i) => {
      let adjustedCategory = doc.category[doc.category.length - 1] === '%'
        ? doc.category.slice(0, doc.category.length - 1)
        : doc.category;
      return (
        <Link to={`/game/${doc.abbrev}${doc.category !== null ? '/' + adjustedCategory : ''}`} key={i}>
          <StandardButton
            title={doc.title}
            category={doc.category}
            iconClasses={doc.type === 'speedrun' ? 'fas fa-stopwatch' : 'fas fa-trophy'}
            iconSide='left'
          />
        </Link>
      );
    });
    return (
      <div>
        <PageHeader>Games</PageHeader>
        <ButtonsContainer>
          {allButtons}
          {/* <StandardButton
            text='Donkey Kong'
            iconClasses='fas fa-trophy'
            iconSide='left'
          />
          <StandardButton
            text='Pac-Man'
            iconClasses='fas fa-trophy'
            iconSide='left'
          />
          <StandardButton
            text='Galaga'
            iconClasses='fas fa-trophy'
            iconSide='left'
          />
          <StandardButton
            text='Mega Man 2'
            iconClasses='fas fa-stopwatch'
            iconSide='left'
          />
          <StandardButton
            text='The Legend of Zelda: Ocarina of Time'
            iconClasses='fas fa-stopwatch'
            iconSide='left'
          />
          <StandardButton
            text='Super Mario Bros.'
            iconClasses='fas fa-stopwatch'
            iconSide='left'
          />
          <StandardButton
            text='Battle Garegga'
            iconClasses='fas fa-trophy'
            iconSide='left'
          /> */}
        </ButtonsContainer>
      </div>
    )
  }
}

export default BrowseGamesPage;