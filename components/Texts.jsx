export const ModalTitle = ({ children }) => {
  return (
    <h1 className="font-monogram p-3 text-center text-3xl tracking-wide text-white">
      {children}
    </h1>
  );
};

export const Paragraph = ({ children }) => {
  return (
    <p className="font-monogram text-xl tracking-wide text-white">{children}</p>
  );
};

export const Text = ({ text }) => {
  return <h5 className=""></h5>;
};
