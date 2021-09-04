import styled from '@emotion/styled';

export const ContactsList = styled.ul`
  display: block;
  padding-left: 10px;
`;
export const SearchInput = styled.input`
  display: block;
  margin-bottom: 20px;
  font-size: 22px;
  outline: unset;
  &:focus,
  &:hover {
    filter: drop-shadow(0px 0px 5px lightblue);
    border: 1px solid lightblue;
  }
`;

export const ContactsItem = styled.li`
  display: block;
  font-family: monospace;
  list-style-type: disc;
  font-size: 18px;
  margin-bottom: 2px;
`;

export const NumberSpan = styled.span`
  position: fixed;
  right: 45px;
  display: inline-flex;
`;
export const DeleteButton = styled.button`
  margin-left: 5px;
  padding: 2px;
  font-size: 10px;
  width: 20px;
  height: 20px;
`;
