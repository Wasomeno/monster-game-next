export const ModalTitle = ({ children }) => {
  return (
    <h1 className="text-center p-3 text-white font-monogram text-3xl tracking-wide">
      {children}
    </h1>
  );
};

export const Paragraph = ({ children }) => {
  return (
    <p className="text-white font-monogram text-xl tracking-wide">{children}</p>
  );
};

export const Text = ({ text }) => {
  return <h5 className=""></h5>;
};
