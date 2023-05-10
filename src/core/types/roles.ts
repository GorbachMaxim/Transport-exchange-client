type RoleName = 'ROLE_ADMIN' | 'ROLE_USER';

interface Role {
  id: number;
  name: RoleName;
}

export default Role;
export type { RoleName };
