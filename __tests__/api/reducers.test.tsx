import { RootState, store } from "@api/app/store";
import globalReducer, { getCart, getEntity, getTheme, getVendorStatus } from "@api/slices/globalSlice";

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
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [], }
    );
  });
  it("should add user details to the state when setCredentials action is dispatched", () => {
    const action = "global/setCredentials";
    const payload = { entity: { id: "1234" }, accessToken: "access-token" };
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual(
      { isVendor: false, entity: { id: "1234" }, accessToken: "access-token", themeType: "system", theme: "dark", cart: [], }
    );
  });
  it("should clear user details from the state when clearCredentials action is dispatched", () => {
    const previousState = { isVendor: false, entity: { id: "1234" }, accessToken: "access-token", themeType: "system", theme: "dark", cart: [], };
    const action = "global/clearCredentials";
    const reducer = setupReducer({ previousState, action });
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [], }
    );
  });
  it("should set the vendor status when the setVendorStatus action is dispatched", () => {
    const action = "global/setVendorStatus";
    const payload = true;
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual(
      { isVendor: true, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [], }
    );
  });
  it("should switch the app theme when the switchTheme action is dispatched", () => {
    const action = "global/switchTheme";
    const payload = "light";
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "light", cart: [], }
    );
  });
  it("should add an item to the cart when the addToCart action is dispatched", () => {
    const action = "global/addItemToCart";
    const payload = { item_id: "test", quantity: 4 };
    const reducer = setupReducer({ action, payload });
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: expect.stringMatching(uuidRegex), item_id: "test", quantity: 4 }], }
    );
  });
  it("should increase the quantity of an item in the cart when the addToCart action is dispatched with an item that already exists in the cart", () => {
    const previousState = { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/addItemToCart";
    const payload = { item_id: "test", quantity: 4 };
    const reducer = setupReducer({ previousState, action, payload });
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: "1234", item_id: "test", quantity: 8 }], }
    );
  });
  it("should remove an item from the cart when the removeFromCart action is dispatched", () => {
    const previousState = { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/removeFromCart";
    const payload = "1234";
    const reducer = setupReducer({ previousState, action, payload });
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [], }
    );
  });
  it("should update an item in the cart when the updateCart action is dispatched", () => {
    const previousState = { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/updateCart";
    const payload = { id: "1234", item_id: "test", quantity: 2 };
    const reducer = setupReducer({ previousState, action, payload });
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: "1234", item_id: "test", quantity: 2 }], }
    );
  });
  it("should return the previous state when the updateCart action is dispatched with an item that does not exist in the cart", () => {
    const previousState = { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/updateCart";
    const payload = { id: "1235", item_id: "test", quantity: 2 };
    const reducer = setupReducer({ previousState, action, payload });
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: "1234", item_id: "test", quantity: 4 }], }
    );
  });
  it("should clear the cart when the clearCart action is dispatched", () => {
    const previousState = { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [{ id: "1234", item_id: "test", quantity: 4 }] };
    const action = "global/clearCart";
    const reducer = setupReducer({ previousState, action });
    expect(reducer).toEqual(
      { isVendor: false, entity: null, accessToken: null, themeType: "system", theme: "dark", cart: [], }
    );
  });
});

describe("When testing the individual selectors", () => {
  let state: RootState = store.getState();
  it("should return the current app theme when the getTheme selector is called", () => {
    expect(getTheme(state)).toEqual("dark");
  });
  it("should return the current vendor status when the getVendorStatus selector is called", () => {
    expect(getVendorStatus(state)).toEqual(false);
  });
  it("should return the current cart when the getCart selector is called", () => {
    expect(getCart(state)).toEqual([]);
  });
  it("should return the current entity when the getEntity selector is called", () => {
    expect(getEntity(state)).toEqual(null);
  });
});