// noinspection CommaExpressionJS

import { ReactElement } from 'react';
import {
  DataSource,
  digitalTwinApi,
  updateDataSourceButtonLink,
} from '../digitalTwinApi';
import Grid from '@material-ui/core/Grid';
import { TableContainer } from '@material-ui/core';
import {
  IonButton,
  IonCard,
  IonContent,
  IonImg,
  IonItem,
  IonText,
  IonTitle,
} from '@ionic/react';

export const DataSources = (): ReactElement | null => {
  const { queries } = digitalTwinApi();

  const { data, isLoading, isLoadingError } = queries.useGetConnectors();

  if (!data || isLoadingError) return null;

  const connectors = data.connectors;

  if (!connectors) return null;

  if (!connectors.length && !isLoading) return null;

  return (
    <Grid item xs={12} md>
      <TableContainer id="featured-data-sources">
        <IonTitle>Import Your Data</IonTitle>
        <IonContent>
          <Grid container>
            {connectors.map((dataSource: DataSource) => (
              <IonItem key={dataSource.id}>
                <IonCard>
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12} md={3}>
                      <IonImg src={dataSource.image} alt={dataSource.name} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <IonText>
                        <IonText>{dataSource.longDescription}</IonText>
                      </IonText>
                      {dataSource.buttons.map(
                        (button, index) => (
                          // eslint-disable-next-line no-sequences
                          updateDataSourceButtonLink(button),
                          (
                            <IonButton key={index} href={button.link}>
                              <IonImg src={button.image} />
                              {button.text}
                            </IonButton>
                          )
                        )
                      )}
                    </Grid>
                  </Grid>
                </IonCard>
              </IonItem>
            ))}
          </Grid>
        </IonContent>
      </TableContainer>
    </Grid>
  );
};
