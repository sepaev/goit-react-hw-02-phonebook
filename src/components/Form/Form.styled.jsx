import styled from '@emotion/styled';

export const SectionStyle = styled.section`
  text-align: left;
  max-width: 450px;
  width: 100%;
  margin: auto;
  border: solid 1px black;
  background-color: white;
  filter: drop-shadow(2px 4px 6px black);
  padding: 25px;
  border-radius: 10px;
  margin: 50px auto;
`;

export const TitleH1 = styled.h1`
  font-size: 28px;
  margin: 0 0 20px;
  font-weight: 700;
`;

export const PhonebookForm = styled.form`
  display: block;
  border: solid 1px black;
  padding: 10px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 26px;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const FormInput = styled.input`
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

export const FormButton = styled.button`
  display: block;
  font-size: 22px;
`;
