import { Component } from 'react';
import PropTypes from 'prop-types';
import { TitleH1, SectionStyle } from '../Form/Form.styled';

export class Section extends Component {
  render = () => {
    const { title, component } = this.props;
    return (
      <SectionStyle>
        <TitleH1>{title}</TitleH1>
        {component}
      </SectionStyle>
    );
  };
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
};
