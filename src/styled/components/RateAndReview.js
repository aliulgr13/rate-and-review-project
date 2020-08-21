import styled from "styled-components";

export default styled.div`
  margin: 200px 0;
  text-align: center;
  display: ${(props) => (props.openReview ? "block" : "none")};
`;
