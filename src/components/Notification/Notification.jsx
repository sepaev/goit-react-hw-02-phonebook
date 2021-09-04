import PropTypes from 'prop-types';
import { TextH2 } from './Notification.styled';

export const Notification = props => {
  const { title } = props;
  return (
    <div>
      <TextH2>{title}</TextH2>
    </div>
  );
};
Notification.propTypes = {
  title: PropTypes.string.isRequired,
};
