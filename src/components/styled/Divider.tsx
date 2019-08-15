import styled, { darken } from "../../application/theme"

const Divider = styled.View`
  width: 100%;
  height: 2px;
  margin: ${p => p.theme.paddingM} 0;
  padding: 0 ${p => p.theme.paddingM};
  background-color: ${p => darken(0.01, p.theme.colorGrey)};
`
export default Divider
