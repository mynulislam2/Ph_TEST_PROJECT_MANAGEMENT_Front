export const pickLowestLoadMember = (members = []) => {
  if (!members.length) return null;
  const sorted = [...members].sort((PersonA, PersonB) => {
    const PersonARatio = PersonA.capacity === 0 ? Infinity : PersonA.current_tasks / PersonA.capacity;
    const PersonBRatio = PersonB.capacity === 0 ? Infinity : PersonB.current_tasks / PersonB.capacity;
    return PersonARatio - PersonBRatio;
  });
  return sorted[0];
};




