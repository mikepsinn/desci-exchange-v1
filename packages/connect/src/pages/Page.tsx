import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage, IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonButton,
} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import './Page.css';
import { getDataSources, UserVariable } from "../digitalTwinApi";

//const DataSources = lazy(() => import('src/routes/safe/components/DataSourcesTable'))

export type Parameter = {
  displayName: string;
  key: string;
  type: string;
  placeholder: string;
  defaultValue: string;
  helpText: string;
  ionIcon?: any;
};

export type ConnectInstructions = {
  url: string;
  parameters: Parameter[];
  usePopup: boolean;
};

export type Button = {
  accessibilityText: string;
  action: string;
  additionalInformation?: any;
  badgeText?: any;
  backgroundColor?: any;
  color: string;
  confirmationText?: any;
  fontAwesome: string;
  functionName: string;
  html: string;
  icon: string;
  id: string;
  image: string;
  ionIcon: string;
  link: string;
  onClick?: any;
  parameters: any[];
  stateName: string;
  stateParams: any;
  subtitle?: any;
  successAlertBody?: any;
  successAlertTitle?: any;
  successToastText?: any;
  target?: any;
  text: string;
  textColor?: any;
  title: string;
  tooltip: string;
  type?: any;
  userId?: any;
  visible?: any;
  webhookUrl?: any;
  slug?: any;
  menus: any[];
};

export type DataSource = {
  affiliate: boolean;
  backgroundColor: string;
  clientRequiresSecret: boolean;
  displayName: string;
  enabled: any;
  getItUrl: string;
  id: number;
  image: string;
  logoColor: string;
  longDescription: string;
  name: string;
  shortDescription: string;
  synonyms: string[];
  availableOutsideUS: boolean;
  maximumRequestTimeSpanInSeconds: number;
  variableNames: string[];
  defaultVariableCategoryName: string;
  mobileConnectMethod: string;
  connectError: string;
  connectInstructions: ConnectInstructions;
  connectorUserEmail?: any;
  connectStatus: string;
  errorMessage: string;
  fontAwesome: string;
  importViaApi: boolean;
  lastSuccessfulUpdatedAt: string;
  logoutUrl: string;
  message: string;
  minimumAllowedSecondsBetweenMeasurements: number;
  newMeasurements?: any;
  providesUserProfileForLogin?: boolean;
  qmClient?: boolean;
  spreadsheetUpload?: boolean;
  totalMeasurementsInLastUpdate?: number;
  updateError: string;
  updateRequestedAt: any;
  updateStatus: string;
  platforms: string[];
  buttons: Button[];
  card?: any;
  connected: boolean;
  count?: any;
  createdAt: string;
  dataSourceType: string;
  defaultUnitAbbreviatedName: string;
  imageHtml: string;
  instructionsHtml?: any;
  linkedDisplayNameHtml: string;
  numberOfConnections?: any;
  numberOfDataSourceImports?: any;
  numberOfDataSourceRequests?: any;
  numberOfMeasurements?: number;
  oauth: boolean;
  premium?: boolean;
  updatedAt?: any;
  userId?: number;
  wpPostId?: any;
  connectorClientId: string;
  scopes: string[];
  stdOAuthToken?: any;
  repositoryImages?: any;
  oauthServiceName: string;
  crappy?: boolean;
  variableCategoryName: string;
  mergeOverlappingMeasurements?: boolean;
  spreadsheetUploadLink: string;
};

export type DataSourceResponse = {
  connectors: DataSource[];
  success: boolean;
  status: string;
  code: number;
  description: string;
  summary: string;
  errors: any[];
  sessionTokenObject?: any;
  avatar?: any;
  warnings: any[];
  data?: any;
};

type UseVariableListReturnType = {
  allVariables: UserVariable[]
  variableList: UserVariable[]
  pinnedUserVariables: UserVariable[]
  togglePin: (variable: UserVariable) => void
  isLoading: boolean
  getUserVariable: (url: string) => UserVariable | undefined
}
let isLoading: boolean = true;
let dataSourceList: DataSource[] = [];


export const Page: React.FC = () => {

  if (isLoading) {
    return (
      <IonContent>
        <IonSpinner />
      </IonContent>
    )
  }


  const items = (dataSourceList || []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CardExamples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {items.map((data: DataSource, idx: number) => (
          <p key={idx}>{data.name}</p>
        ))}
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in
            awhile, and climb a mountain or spend a week in the woods. Wash your
            spirit clean.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>ion-item in a card, icon left, button right</IonLabel>
            <IonButton fill="outline" slot="end">
              View
            </IonButton>
          </IonItem>

          <IonCardContent>
            This is content, without any paragraph or header tags, within an
            ion-cardContent element.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonItem href="#" className="ion-activated">
            <IonIcon icon={wifi} slot="start" />
            <IonLabel>Card Link Item 1 activated</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonIcon icon={wine} slot="start" />
            <IonLabel>Card Link Item 2</IonLabel>
          </IonItem>

          <IonItem className="ion-activated">
            <IonIcon icon={warning} slot="start" />
            <IonLabel>Card Button Item 1 activated</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={walk} slot="start" />
            <IonLabel>Card Button Item 2</IonLabel>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Page;
