// noinspection ES6MissingAwait,JSIgnoredPromiseFromCall

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIonToast } from '@ionic/react';
import { FETCH_STATUS } from '../../../utils/requests';
import { UserVariable } from '../../../digitalTwinApi';
import { fetchUserVariablesList } from '../../../api/fetchUserVariables';

type ReturnType = {
  remoteUserVariables: UserVariable[];
  status: FETCH_STATUS;
};

// Memoize the fetch request so that simultaneous calls
// to this function return the same promise
let fetchPromise: Promise<UserVariable[]> | null = null;
const memoizedFetchUserVariables = (): Promise<UserVariable[]> => {
  if (!fetchPromise) {
    fetchPromise = fetchUserVariablesList();
  }
  fetchPromise.finally(() => (fetchPromise = null));
  return fetchPromise;
};

const useRemoteUserVariables = (): ReturnType => {
  const [remoteUserVariables, setRemoteUserVariables] = useState<
    UserVariable[]
  >([]);
  const [status, setStatus] = useState<FETCH_STATUS>(FETCH_STATUS.NOT_ASKED);
  const dispatch = useDispatch();
  const [presentToast] = useIonToast();

  useEffect(() => {
    const loadVariablesList = async () => {
      setStatus(FETCH_STATUS.LOADING);
      try {
        const result = await memoizedFetchUserVariables();

        if (result?.length) {
          setRemoteUserVariables(result);
          setStatus(FETCH_STATUS.SUCCESS);
        } else {
          setStatus(FETCH_STATUS.ERROR);
          const message = 'Empty variables array 🤬';
          console.error(message);
          presentToast(message);
        }
      } catch (e) {
        setStatus(FETCH_STATUS.ERROR);
        console.error('Error loading variables list', e);
        presentToast('SAFE_VARIABLES_FETCH_ERROR_MSG');
      }
    };

    loadVariablesList();
  }, [dispatch, presentToast]);

  return { remoteUserVariables, status };
};

export { useRemoteUserVariables };
