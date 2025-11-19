export const summarizeReassignments = (reassignments = []) =>
  reassignments.slice(0, 5).map((item) => ({
    title: item.taskTitle,
    from: item.fromMember,
    to: item.toMember,
    priority: item.priority,
  }));

