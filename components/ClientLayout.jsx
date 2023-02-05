import React, { useEffect, useState } from "react";

const ClientLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;
  return <>{children}</>;
};

export default ClientLayout;
