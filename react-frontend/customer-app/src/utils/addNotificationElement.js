export const addNotificationElement = (type, content) => {
  if (!document.getElementById(type + "Notification")) {
    const notification = document.createElement("p");
    const message = document.createTextNode(content);
    notification.appendChild(message);
    notification.id = type + "Notification";
    notification.setAttribute("class", "red mt-1");
    // add notify element
    const element = document.getElementById(type);
    element.appendChild(notification);
  }
};