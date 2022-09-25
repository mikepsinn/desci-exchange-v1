// noinspection ES6MissingAwait
// noinspection JSIgnoredPromiseFromCall

import React, { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
// @ts-ignore
import LitJsSdk from 'lit-js-sdk';
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonImg,
  useIonToast,
} from '@ionic/react';
import { CardActions, CircularProgress, IconButton } from '@material-ui/core';
import {
  CHAIN_POLYGON,
  mintNFTForUserVariable,
  UserVariable,
} from '../../digitalTwinApi';
import { copyToClipboard } from '../../utils/clipboard';
import { FETCH_STATUS } from '../../utils/requests';

const chainNameLowercase = CHAIN_POLYGON.toLowerCase();

type UserVariableCardProps = {
  userVariable: UserVariable;
};

const litNodeClient = new LitJsSdk.LitNodeClient();
litNodeClient.connect();

function getWalletAddress() {
  return '';
}

const UserVariableCard = ({ userVariable }: UserVariableCardProps) => {
  console.log(
    'Rendering UserVariableCard for ' + userVariable.name,
    userVariable
  );
  const [minting, setMinting] = useState(false);
  const [mintingComplete, setMintingComplete] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [presentToast] = useIonToast();
  // async function encryptString(str, accessControlConditionsNFT) {
  //   const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
  //   const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(str)
  //
  //   const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
  //     accessControlConditions: accessControlConditionsNFT,
  //     symmetricKey,
  //     authSig,
  //     chain,
  //   })
  //
  //   return {
  //     encryptedFile: encryptedString,
  //     encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16'),
  //   }
  // }
  //
  // async function decryptString(encryptedStr, encryptedSymmetricKey, accessControlConditionsNFT) {
  //   const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
  //   const symmetricKey = await this.litNodeClient.getEncryptionKey({
  //     accessControlConditions: accessControlConditionsNFT,
  //     toDecrypt: encryptedSymmetricKey,
  //     chain,
  //     authSig,
  //   })
  //   return await LitJsSdk.decryptString(encryptedStr, symmetricKey)
  // }

  const shareUserVariable = async () => {
    const gottenFileUrl = await mintNFTForUserVariable(
      userVariable,
      getWalletAddress(),
      chainNameLowercase
    );
    setFileUrl(gottenFileUrl);
    copyToClipboard(fileUrl);
    const NFTS_ROUTE = '/nfts';
    const nftsLink = generatePath(NFTS_ROUTE, {});
    presentToast({
      message: 'Sent to safe',
      duration: 3000,
      onDidDismiss: (e: CustomEvent) => console.log('Dismiss clicked', e),
      buttons: [
        {
          text: 'See NFTs',
          role: 'info',
          handler: () => {
            window.location.href = nftsLink;
          },
        },
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Dismiss clicked');
          },
        },
      ],
    });
    setMinting(false);
    setMintingComplete(true);
  };

  const isUserVariableLoading =
    userVariable.fetchStatus === FETCH_STATUS.LOADING;

  if (isUserVariableLoading) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <IonContent>
      <Link
        to={`/userVariables/${userVariable.id}`}
        aria-label={`open ${userVariable.name} Safe User Variable`}
      >
        <IonCard>
          {/* Safe UserVariable Logo */}
          <IonCardContent>
            <IonImg
              src={userVariable.imageUrl}
              alt={`${userVariable.name || 'Safe UserVariable'} Logo`}
            />
          </IonCardContent>

          {/* Safe UserVariable Description */}
          <IonCardContent>
            <IonCardTitle>
              {minting ? `Minting ...` : mintingComplete ? 'Minted' : ''}{' '}
              {userVariable.name}
            </IonCardTitle>
            <IonCardSubtitle color="inputFilled">
              {userVariable.name + ' Data and Relationships'}
            </IonCardSubtitle>
          </IonCardContent>

          {/* Safe UserVariable Actions */}
          <CardActions onClick={(e) => e.preventDefault()}>
            {/* Share Safe UserVariable button */}
            <IconButton
              onClick={shareUserVariable}
              aria-label={`copy ${userVariable.name} Safe User Variable share link to clipboard`}
            >
              <IonIcon size="md" />
            </IconButton>
          </CardActions>
        </IonCard>
      </Link>
    </IonContent>
  );
};

export default UserVariableCard;
