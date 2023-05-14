import { AxiosError } from "axios";
import { CanceledError } from "../services/api-client";
import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setLoading(false);
      });

    //setLoading should be in .finally but it doesn't work in strict mode for some reason
    return () => cancel();

    // .then((response) => setUsers(response.data))
    // .catch((err) => setError(err.message));
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
