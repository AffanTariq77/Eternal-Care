let booking: any = {};

export function setBooking(b: any) {
  booking = { ...(booking || {}), ...(b || {}) };
}

export function getBooking() {
  return booking || {};
}
