import React from 'react'
import { IonContent, IonSearchbar } from "@ionic/react";

type Props = {
  value: string
  onValueChange: (value: string) => void
}

const SearchInputCard = ({ value, onValueChange }: Props): React.ReactElement => (
  <IonContent>
    <IonSearchbar value={value} onIonChange={e => onValueChange(e.detail.value!)}></IonSearchbar>
  </IonContent>
)

export { SearchInputCard }
