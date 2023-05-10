import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/storeContext';
import { RoleName } from '../../core/types/roles';

interface AvailableForProps {
  children: JSX.Element;
  roles: RoleName[];
}

const AvailableFor = observer(
  (props: AvailableForProps): JSX.Element | null => {
    const userStore = useStore('UserStore');

    return props.roles.some(
      (role) => role === userStore.getUser()?.roles[0].name,
    )
      ? props.children
      : null;
  },
);

export default AvailableFor;
