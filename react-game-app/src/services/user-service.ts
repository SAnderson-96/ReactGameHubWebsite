import { createHttpService } from "./http-service";
export interface User {
  id: number;
  name: string;
}

export default createHttpService("/users");
