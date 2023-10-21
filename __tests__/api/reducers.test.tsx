import { RootState, store } from "@api/app/store";
import globalReducer, { getAccessToken, getAllowLocation, getAllowPush, getAllowToast, getCart, getEntity, getGlobalState, getShowOnboard, getTheme, getThemeType, getVendorStatus } from "@api/slices/globalSlice";
import { initialState } from "../testhelpers";

describe("When testing the individual reducers", () => {
  interface SetupReducerProps {
    previousState?: any;
    action?: any;
    payload?: any;
  }
  const setupReducer = ({ previousState, action, payload }: SetupReducerProps) => {
    return globalReducer(previousState, { type: action, payload });
  };
  const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

  it("should return the initial state", () => {
    const reducer = setupReducer({});
    expect(reducer).toEqual(initialState);
  });
  it("should add entity to the state when setCredentials action is dispatched", () => {
    const action = "global/setCredentials", payload = { entity: { id: "1234" } };
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual({ ...initialState, entity: { id: "1234" } });
  });
  it("should add accessToken to the state when setCredentials action is dispatched", () => {
    const action = "global/setCredentials", payload = { accessToken: "access-token" };
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual({ ...initialState, accessToken: "access-token" });
  });
  it("should clear user details from the state when clearCredentials action is dispatched", () => {
    const previousState = { ...initialState, entity: { id: "1234" }, accessToken: "access-token" };
    const action = "global/clearCredentials";
    const reducer = setupReducer({ previousState, action });
    expect(reducer).toEqual(initialState);
  });
  it("should set the vendor status when the setVendorStatus action is dispatched", () => {
    const action = "global/setVendorStatus", payload = true;
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual({ ...initialState, isVendor: true });
  });
  it("should switch the app theme when the switchTheme action is dispatched", () => {
    const action = "global/switchTheme", payload = "light";
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual({ ...initialState, theme: "light" });
  });
  it("should add an item to the cart when the addToCart action is dispatched", () => {
    const action = "global/addItemToCart", payload = { item_id: "test", quantity: 4 };
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual({ ...initialState, cart: [{ id: expect.stringMatching(uuidRegex), item_id: "test", quantity: 4 }] });
  });
  it("should increase the quantity of an item in the cart when the addToCart action is dispatched with an item that already exists in the cart", () => {
    const previousState = { ...initialState, cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/addItemToCart", payload = { item_id: "test", quantity: 4 };
    const reducer = setupReducer({ previousState, action, payload });
    expect(reducer).toEqual({ ...initialState, cart: [{ id: "1234", item_id: "test", quantity: 8 }] });
  });
  it("should remove an item from the cart when the removeFromCart action is dispatched", () => {
    const previousState = { ...initialState, cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/removeFromCart", payload = "1234";
    const reducer = setupReducer({ previousState, action, payload });
    expect(reducer).toEqual(initialState);
  });
  it("should update an item in the cart when the updateCart action is dispatched", () => {
    const previousState = { ...initialState, cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/updateCart", payload = { id: "1234", item_id: "test", quantity: 2 };
    const reducer = setupReducer({ previousState, action, payload });
    expect(reducer).toEqual({ ...initialState, cart: [{ id: "1234", item_id: "test", quantity: 2 }] });
  });
  it("should return the previous state when the updateCart action is dispatched with an item that does not exist in the cart", () => {
    const previousState = { ...initialState, cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/updateCart", payload = { id: "1235", item_id: "test", quantity: 2 };
    const reducer = setupReducer({ previousState, action, payload });
    expect(reducer).toEqual({ ...initialState, cart: [{ id: "1234", item_id: "test", quantity: 4 }] });
  });
  it("should clear the cart when the clearCart action is dispatched", () => {
    const previousState = { ...initialState, cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/clearCart";
    const reducer = setupReducer({ previousState, action });
    expect(reducer).toEqual(initialState);
  });
  it("should set the showOnboard state to false when the setShowOnboard action is dispatched", () => {
    const action = "global/setShowOnboard", payload = false;
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual({ ...initialState, showOnboard: false });
  });
  it("should toggle the themetype when the toggleThemeType action is dispatched", () => {
    const action = "global/toggleThemeType";
    const reducer = setupReducer({ action });
    expect(reducer).toEqual({ ...initialState, themeType: "manual" });
    const reducer2 = setupReducer({ previousState: { ...initialState, themeType: "manual" }, action });
    expect(reducer2).toEqual({ ...initialState, themeType: "system" });
  });
  it("should toggle the theme when the toggleTheme action is dispatched", () => {
    const action = "global/toggleTheme";
    const reducer = setupReducer({ action });
    expect(reducer).toEqual({ ...initialState, theme: "light" });
    const reducer2 = setupReducer({ previousState: { ...initialState, theme: "light" }, action });
    expect(reducer2).toEqual({ ...initialState, theme: "dark" });
  });
  it("should toggle the allowPush when the toggleAllowPush action is dispatched", () => {
    const action = "global/toggleAllowPush";
    const reducer = setupReducer({ action });
    expect(reducer).toEqual({ ...initialState, allowPush: false });
  });
  it("should toggle the allowToast when the toggleAllowToast action is dispatched", () => {
    const action = "global/toggleAllowToast";
    const reducer = setupReducer({ action });
    expect(reducer).toEqual({ ...initialState, allowToast: false });
  });
  it("should toggle the allowLocation when the toggleAllowLocation action is dispatched", () => {
    const action = "global/toggleAllowLocation";
    const reducer = setupReducer({ action });
    expect(reducer).toEqual({ ...initialState, allowLocation: false });
  });
});

describe("When testing the individual selectors", () => {
  let state: RootState = store.getState();
  it("should return the current access token when the getAccessToken selector is called", () => {
    expect(getAccessToken(state)).toEqual(null);
  });
  it("should return the current allowLocation value when the getAllowLocation selector is called", () => {
    expect(getAllowLocation(state)).toBeTruthy();
  });
  it("should return the current allowPush value when the getAllowPush selector is called", () => {
    expect(getAllowPush(state)).toBeTruthy();
  });
  it("should return the current allowToast value when the getAllowToast selector is called", () => {
    expect(getAllowToast(state)).toBeTruthy();
  });
  it("should return the current cart when the getCart selector is called", () => {
    expect(getCart(state)).toEqual([]);
  });
  it("should return the current entity when the getEntity selector is called", () => {
    expect(getEntity(state)).toEqual(null);
  });
  it("should return the current global state when the getGlobalState selector is called", () => {
    expect(getGlobalState(state)).toEqual(initialState);
  });
  it("should return the current value for showOnboard when the getShowOnboard selector is called", () => {
    expect(getShowOnboard(state)).toEqual(true);
  });
  it("should return the current app theme when the getTheme selector is called", () => {
    expect(getTheme(state)).toEqual("dark");
  });
  it("should return the current app theme type when the getThemeType selector is called", () => {
    expect(getThemeType(state)).toEqual("system");
  });
  it("should return the current vendor status when the getVendorStatus selector is called", () => {
    expect(getVendorStatus(state)).toEqual(false);
  });
});
