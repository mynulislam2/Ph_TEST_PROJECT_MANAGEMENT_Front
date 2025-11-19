export const isOverCapacity = (member) => member.current_tasks >= member.capacity;

export const capacityLabel = (member) =>
  `${member.current_tasks}/${member.capacity} tasks`;

