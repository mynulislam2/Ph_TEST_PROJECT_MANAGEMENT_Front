import clsx from 'classnames';
import { capacityLabel, isOverCapacity } from '../../../utils/capacity.utils.js';
import './MemberCapacityRow.css';

export const MemberCapacityRow = ({ member }) => {
  const overloaded = isOverCapacity(member);
  const percentage = Math.min((member.current_tasks / member.capacity) * 100 || 0, 100);

  return (
    <div className={clsx('capacity-row', overloaded && 'capacity-row--over')}>
      <div>
        <p className="capacity-row__name">{member.name}</p>
        <p className="capacity-row__role">{member.role}</p>
      </div>
      <div className="capacity-row__bar">
        <div className="capacity-row__bar-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span>{capacityLabel(member)}</span>
    </div>
  );
};

