import Button from '@material-ui/core/Button';
import { IonCard, IonCardTitle } from '@ionic/react';
import React from 'react';

type Props = {
  query: string;
  onWalletConnectSearch: () => void;
};

const NoVariablesFound = ({
  query,
  onWalletConnectSearch,
}: Props): React.ReactElement => (
  <IonCard>
    <IonCardTitle>
      No variables found matching <b>{query}</b>
    </IonCardTitle>
    <Button onClick={onWalletConnectSearch}>Start Tracking!</Button>
  </IonCard>
);

export { NoVariablesFound };
