import { ReactElement } from 'react';
import { Box, Grid } from '@material-ui/core';
import { digitalTwinApi, Measurement } from '../../digitalTwinApi';
import {
  IonCard,
  IonCardContent,
  IonImg,
  IonItem,
  IonText,
  IonTitle,
} from '@ionic/react';

export const MeasurementList = (): ReactElement | null => {
  const { queries } = digitalTwinApi();

  const { data, isLoading, isLoadingError } = queries.useGetMeasurements();

  if (!data || isLoadingError) return null;

  const measurements = data;

  if (!measurements) return null;

  if (!measurements.length && !isLoading) return null;

  return (
    <Grid item xs={12} md>
      <IonCard id="featured-safe-apps">
        <IonTitle>Recent Measurements</IonTitle>
        <IonCardContent>
          <Grid container>
            {measurements.map((measurement: Measurement) => (
              <IonItem key={measurement.id}>
                <IonCard>
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12} md={3}>
                      <IonImg
                        src={measurement.pngPath}
                        alt={measurement.displayValueAndUnitString}
                      />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Box mb={1.01}>
                        <IonText>
                          {measurement.displayValueAndUnitString +
                            ' ' +
                            measurement.variableName}
                        </IonText>
                      </Box>
                      <IonText color="primary">Edit Measurement</IonText>
                    </Grid>
                  </Grid>
                </IonCard>
              </IonItem>
            ))}
          </Grid>
        </IonCardContent>
      </IonCard>
    </Grid>
  );
};
export default MeasurementList;
