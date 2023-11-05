import { useCallback, useReducer } from 'react';

// Custom hook to force re-render
function useForceUpdate() {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    return useCallback(forceUpdate, []);
}

export default useForceUpdate;