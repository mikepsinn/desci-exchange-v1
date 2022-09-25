import { ReactElement } from 'react'
import { Measurement } from "../../digitalTwinApi";
import { IonImg, IonItem, IonText, IonTitle } from "@ionic/react";


const MeasurementListItem = (measurement: Measurement): ReactElement => {
  return (
    <IonItem key={measurement.id} href={measurement.url || ''}>
      <IonTitle>
        {measurement.displayName}
      </IonTitle>
      <IonImg
        src={measurement.pngUrl || undefined}
      />
      <IonText>{measurement.displayValueAndUnitString}</IonText>
    </IonItem>
  )
}

export default MeasurementListItem
