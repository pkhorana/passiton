import React from 'react';
import { Item, Input, Label } from 'native-base';

class EmailTextBox extends React.Component {

    render() {
        const { label, onChange } = this.props;
        return (
            <Item floatingLabel>
              <Label style={{ color: "white" }}>Email</Label>
                <Input
                    onChangeText={(e) => onChange(e)}
                    maxLength={250}
                />
            </Item>
        );
    }
}
export default EmailTextBox;
