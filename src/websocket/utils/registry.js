export const messageHandlers = new Map();
export const messageValidators = new Map();
export const messageCreators = new Map();

export const registerMessageType = (type, {
    validator,
    handler
  }) => {
  messageValidators.set(type, validator);
  if (handler) messageHandlers.set(type, handler);
};