import { notifyError } from "./notification.helper.";

/**
 *
 * @param {Array} cart - the cart state handled by the cart index.js page
 * @param {Function} setCart - the setter function for the cart state
 * @returns a function with the signature: `(serviceId: string, inclusionId: number): void`
 */
export const inclusionFunctionThunk =
  (cart, setCart) => (serviceId, inclusionId) => {
    const cartItemWithServiceId = cart.find(
      (cartItem) => cartItem.service === serviceId
    );

    // if there is no serviceId in the cart yet,
    if (cartItemWithServiceId === undefined) {
      setCart(cart.concat({ service: serviceId, inclusions: [inclusionId] }));
    }
    // if serviceId in the cart exists, but the length of inclusions is 0
    else if (cartItemWithServiceId.inclusions.length === 0) {
      setCart(
        cart.map((cartItem) =>
          cartItem.service === serviceId
            ? { ...cartItemWithServiceId, inclusions: [inclusionId] }
            : cartItem
        )
      );
    } else if (
      // if the inclusion is already found, we remove the inclusion
      cartItemWithServiceId.inclusions.find((i) => i === inclusionId) !==
      undefined
    ) {
      const newCartItem = {
        ...cartItemWithServiceId,
        inclusions: cartItemWithServiceId.inclusions.filter(
          (i) => i !== inclusionId
        ),
      };

      // we remove the item completely if the inclusions length is gone
      setCart(
        cart
          .map((cartItem) =>
            cartItem.service === serviceId ? newCartItem : cartItem
          )
          .filter((cartItem) => cartItem.inclusions.length > 0)
      );
    } else {
      // get the cartItem with the serviceId and add inclusionId to its inclusions property
      const newCartItem = {
        ...cartItemWithServiceId,
        inclusions: cartItemWithServiceId.inclusions.concat(inclusionId),
      };

      setCart(
        cart.map((cartItem) =>
          cartItem.service === serviceId ? newCartItem : cartItem
        )
      );
    }
  };

/**
 *
 * @param {Object} services - the services returned by @/services/api/getServices
 * @param {Array} cart - the cart state with `cart.service: string` and `cart.inclusions: number[]`
 *
 * @returns a number representing the total price (in USD) of the `cart` based on the `services` data
 *
 * @example
 *
 * const total = getTotalPrice({...services}, [{ service: AUTHOR_BLOG_SITE_SERVICE_ID, inclusions: [1,2,9] }]);
 * // returns 2000 because 9 is a premium tier service
 * console.log(total);
 */
export const getTotalPrice = (services, cart) => {
  const AUTHOR_BLOG_SITE_SERVICE_ID = services.find(
    (service) => service.title === "Author's Blog Site"
  )?.id;

  const getPriceOfService = (id) => {
    const serviceDetails = services.find((s) => s.id === id);
    // if it's not the Author's Blog Site
    if (AUTHOR_BLOG_SITE_SERVICE_ID && id !== AUTHOR_BLOG_SITE_SERVICE_ID) {
      return serviceDetails.priceTier.basic.price;
    } else {
      // otherwise, we traverse the cart to see if the blog site service inclusions have the premium services
      const isPremium = (inclusionId) => inclusionId >= 6; // 6-10 denote premium tier
      return cart
        .find((cartItem) => cartItem.service === AUTHOR_BLOG_SITE_SERVICE_ID)
        ?.inclusions.filter(isPremium).length > 0
        ? serviceDetails.priceTier.premium.price
        : serviceDetails.priceTier.basic.price;
    }
  };

  const totalPriceOfCartItems = cart
    .map((cartItem) => getPriceOfService(cartItem.service))
    .reduce((total, currentItem) => total + currentItem, 0);

  return totalPriceOfCartItems;
};

/**
 * Sets the localStorage cart state whenever the cart changes.
 * This should be used in a useEffect that triggers every cart state change, inside the @/pages/cart/index.js file.
 *
 * @param {Array} cart the cart array with the type {service: string, inclusions: number[]}[]
 */
export const setCartState = (cart) => {
  function isLocalStorageAvailable() {
    try {
      const testKey = "__test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  if (isLocalStorageAvailable()) {
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    console.log(
      "ERROR: Your cart data can't be saved in localStorage. Contact the developers or try another device."
    );
  }
};

/**
 * Gets the cart state inside localStorage to be used in the @/pages/cart/index.js file on first render as the initial state of cart.
 *
 * @returns the cart array with the type {service: string, inclusions: number[]}[]
 */
export const getCartState = () => {
  function isLocalStorageAvailable() {
    try {
      const testKey = "__test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  if (isLocalStorageAvailable()) {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } else {
    console.log(
      "ERROR: Your cart data can't be saved in localStorage. Contact the developers or try another device."
    );
    return [];
  }
};
