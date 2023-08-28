import { useEffect, useMemo, useState } from "react";
import { axios } from "../config/axios";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  id: string;
  role: Role;
  email: string;
}

interface AuthData {
  accessToken: string;
}

const useAuth = () => {
  const [user, setUser] = useState<IUser>(null);
  const [accesToken, setAccesToken] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<AuthData>("auth/refresh-token")
      .then((res) => {
        if (res.status === 200) setAccesToken(res.data.accessToken);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    accesToken &&
      axios
        .get<IUser>("auth/me", {
          headers: {
            Authorization: `Bearer ${accesToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) setUser(res.data);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
  }, [accesToken]);

  return useMemo(() => ({ loading, user }), [loading, user]);
};

export default useAuth;
