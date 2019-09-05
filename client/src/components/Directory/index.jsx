import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../MenuItem';
import { StyledDirectory } from './styled.directory';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory = ({ sections }) => (
  <StyledDirectory>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </StyledDirectory>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
