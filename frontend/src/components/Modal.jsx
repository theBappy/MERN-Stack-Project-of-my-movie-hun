const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
  
        {/* Modal Content */}
        <div className="relative bg-white w-full max-w-lg p-5 rounded-lg shadow-lg z-50">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="text-gray-600 hover:text-gray-900 font-semibold focus:outline-none"
              onClick={onClose}
            >
              ✖
            </button>
          </div>
  
          {/* Modal Body */}
          <div>{children}</div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  