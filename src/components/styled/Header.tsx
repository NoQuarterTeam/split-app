import styled from "../../application/theme"

const Header = styled.Text`
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontBold};
  font-family: ${p => p.theme.fontFamilyHeader};
`
export default Header
