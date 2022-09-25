import { ReactElement } from 'react';
import {
  digitalTwinApi,
  getAccessToken,
  UserVariable,
} from '../digitalTwinApi';
import { Box, CardContent, DialogTitle } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { IonCard, IonImg, IonText } from '@ionic/react';
import { NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';

export const FeaturedVariables = (): ReactElement | null => {
  const { queries } = digitalTwinApi();

  const { data, isLoading, isLoadingError } = queries.useGetVariables();

  if (!data || isLoadingError) return null;

  const variables = data;

  if (!variables) return null;

  if (!variables.length && !isLoading) return null;

  const IFRAME_ROUTE = '/iframe';
  return (
    <Grid item xs={12} md>
      <Container id="featured-variables">
        <DialogTitle>Variables</DialogTitle>
        <CardContent>
          <Grid container>
            {variables.map((variable: UserVariable) => (
              <NavLink
                to={
                  IFRAME_ROUTE +
                  '?appUrl=' +
                  variable.url +
                  '&accessToken=' +
                  getAccessToken()
                }
                style={{ textDecoration: 'none' }}
              >
                <IonCard>
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12} md={3}>
                      <IonImg src={variable.imageUrl} alt={variable.name} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Box mb={1.01}>
                        <IonText>{variable.displayName}</IonText>
                      </Box>
                      <IonText color="primary">View Mega Study</IonText>
                    </Grid>
                  </Grid>
                </IonCard>
              </NavLink>
            ))}
          </Grid>
        </CardContent>
      </Container>
    </Grid>
  );
};
