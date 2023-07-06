export const collections = {
  USERS: "users",
  SERVICES: "services",
};

export const callables = {
  createPaymentIntent: "api-stripe-createPaymentIntent",
  sendContactEmail: "api-contact-sendContactEmail",
  user: {
    update: "api-user-updateUser",
    create: "api-user-createUser",
  },
};
