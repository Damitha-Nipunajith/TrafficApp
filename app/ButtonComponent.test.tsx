import ButtonComponent from "./ButtonComponent"
import {render} from '@testing-library/react-native'


it('should render a title',()=>{
  const {getByText} = render(
    <ButtonComponent title ="Refresh" onPress={()=>{}} />
  )
  expect(getByText('Refresh')).toBeTruthy();
})