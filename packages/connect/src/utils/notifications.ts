import { useIonToast } from "@ionic/react";

const [presentToast] = useIonToast();
export const showNotification = (
  payload: Notification | string,
) => {
  if(typeof payload === "string") {
    return presentToast({
      message: payload,
      duration: 2000,
    });
  }
  let buttons = [
    {
      text: 'Dismiss',
      role: 'cancel',
      handler: () => { console.log('Dismissed: ', payload) }
    }
  ];
  if(payload.data?.buttons){
    buttons = payload.data.buttons;
  }
  return presentToast({
    message: payload.title,
    duration: payload.data.duration,
    onDidDismiss: (e: CustomEvent) => console.log('Dismissed: ', payload),
    buttons: buttons
  })
}
