import React, { useState } from 'react';
import { SearchInputCard } from './SearchInputCard';
import { NoVariablesFound } from './NoVariablesFound';
import { useVariablesSearch } from '../hooks/useVariablesSearch';
import { CircularProgress } from '@material-ui/core';
import { IonContent, IonTitle } from '@ionic/react';
import { useVariableList } from '../hooks/useVariableList';
import UserVariableCard from '../UserVariableCard';

const VariablesList = (): React.ReactElement => {
  const [variableSearch, setVariableSearch] = useState('');
  const { variableList, isLoading } = useVariableList();
  const variables = useVariablesSearch(variableList, variableSearch);
  const noVariablesFound = variables.length === 0 && variableSearch;

  if (isLoading) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <IonContent>
      <IonContent>
        <SearchInputCard
          value={variableSearch}
          onValueChange={(value) =>
            setVariableSearch(value.replace(/\s{2,}/g, ' '))
          }
        />

        <IonTitle color="placeHolder">
          {variableSearch ? 'SEARCH RESULTS' : 'ALL VARIABLES'}
        </IonTitle>
        {noVariablesFound && (
          <NoVariablesFound
            query={variableSearch}
            onWalletConnectSearch={() => setVariableSearch('WalletConnect')}
          />
        )}
        {variables.map((safeVariable) => (
          <UserVariableCard key={safeVariable.id} userVariable={safeVariable} />
        ))}
      </IonContent>
    </IonContent>
  );
};

export default VariablesList;
