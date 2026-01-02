let booking: any = {};

export function setBooking(b: any) {
  booking = { ...(booking || {}), ...(b || {}) };
  try { console.log('bookingStore.setBooking', booking); } catch(e){}
}

export function getBooking() {
  return booking || {};
}
