import { RootState, store } from "@api/app/store";
import { useDispatch, useSelector } from "react-redux";

describe('Testing the Typed Redux Hooks from appHooks.ts', () => {
  const appHooks = jest.requireActual('@api/app/appHooks');
  it('useAppDispatch should dispatch action', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const dispatch = appHooks.useAppDispatch();
    dispatch({ type: 'TEST', payload: 'test' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'TEST', payload: 'test' });
  });
  it('should select count from state', () => {
    let state: RootState = store.getState();
    (useSelector as jest.Mock).mockReturnValue(state);
    const isVendor = appHooks.useAppSelector((state: RootState) => state.global.isVendor);
    expect(isVendor).toBeTruthy();
  });
});
