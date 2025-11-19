export const pickLowestLoadMember = (members = []) => {
  if (!members.length) return null;
  const sorted = [...members].sort((a, b) => {
    const aRatio = a.capacity === 0 ? Infinity : a.current_tasks / a.capacity;
    const bRatio = b.capacity === 0 ? Infinity : b.current_tasks / b.capacity;
    return aRatio - bRatio;
  });
  return sorted[0];
};

