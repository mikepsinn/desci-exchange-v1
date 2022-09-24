import React from 'react';
import { Button, updateDataSourceButtonLink } from '../../../digitalTwinApi';
import { ButtonGroup } from '@material-ui/core';
import { IonButton, IonContent, IonIcon, IonRow, IonTitle } from '@ionic/react';

type Props = {
  data: any;
};

class DataSourceButtonsContainer extends React.Component<{
  buttons: any;
  prop1: (item: Button, index: number) => any;
}> {
  override render() {
    return (
      <ButtonGroup>{this.props.buttons.map(this.props.prop1)}</ButtonGroup>
    );
  }
}

const DataSourceRow = ({ data }: Props): React.ReactElement => (
  <IonRow>
    <IonTitle>{data.displayName}</IonTitle>
    <IonContent>{data.longDescription}</IonContent>
    <IonContent>
      <DataSourceButtonsContainer
        buttons={data.buttons}
        prop1={(item, index) => (
          updateDataSourceButtonLink(item),
          (
            <IonButton key={index} href={item.link}>
              <IonIcon src={item.image} />
              {item.text}
            </IonButton>
          )
        )}
      />
    </IonContent>
  </IonRow>
);

export { DataSourceRow };
