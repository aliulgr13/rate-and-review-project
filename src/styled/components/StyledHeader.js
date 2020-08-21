import styled from "styled-components";

export default styled.h1`
  margin: 50px;
  text-align: center;
  font-size: 55px;
  color: ${(props) =>
    props.secondary ? props.theme.fireBrick : props.theme.pelorus};
`;
