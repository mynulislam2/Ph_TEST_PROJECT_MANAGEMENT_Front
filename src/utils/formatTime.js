import dayjs from 'dayjs';

export const formatTime = (value) => dayjs(value).format('MMM D, h:mm A');

