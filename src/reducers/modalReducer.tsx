import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the modal state type
export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any;
}

// Define the modal action types
type ModalAction =
  | { type: 'OPEN_MODAL'; payload: { type: string; data?: any } }
  | { type: 'CLOSE_MODAL' };

// Create the context
export const ModalContext = createContext<{
  state: ModalState;
  dispatch: React.Dispatch<ModalAction>;
} | undefined>(undefined);

// Initial state
const initialState: ModalState = {
  isOpen: false,
  type: null,
  data: null
};

// Reducer function
function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
        type: null,
        data: null
      };
    default:
      return state;
  }
}

// Custom hook to use the modal context
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

// Provider component
interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
} 