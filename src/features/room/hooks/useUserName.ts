import { useState } from "react";

export const useUserName = () => {
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || ""
  );

  return { userName, setUserName };
};
