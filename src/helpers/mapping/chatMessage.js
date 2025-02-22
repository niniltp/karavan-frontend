export const ChatMessage = {
  validator: (message) => {
    const isValid = typeof message?.sender_id === 'string' &&
                    typeof message?.content === 'string'
    return isValid;
  },
  mapFromAPI: (APImessage) => {
    if(!ChatMessage.validator(APImessage)) {
      throw new Error('Invalid data for mapping Chat object'); // TODO : refactor with error code etc
    }
  
    const message = ChatMessage.create(APImessage.sender_id, APImessage.content);

    return message;
  },
  mapArrayFromAPI: (APImessages) => {
    const messages = [];

    APImessages?.forEach( (APImessage) => {
      const message = ChatMessage.mapFromAPI(APImessage);
      messages.push(message);
    })

    return messages;
  },
  createForAPI: (senderId, content) => {
    return {
      sender_id: senderId,
      content: content
    }
  },
  create: (senderId, content) => {
    const message = {
      senderId: senderId,
      content: content
    }
  
    return message;
  }
}