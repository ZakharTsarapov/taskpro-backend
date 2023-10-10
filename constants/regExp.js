export const emailRegExp = /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
export const passwordRegExp = /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;'"?/]{6,64}$/;
export const nameRegExp = /^[0-9a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ!@#$%^&* .\\/-]{2,32}$/;
export const deadlineRegExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;