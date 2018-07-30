import Api from '@/services/Api'

export default {
  addGuest (name, side, attendance) {
    if (attendance === '不出席') {
      attendance = 0
    }
    return Api().post('/guest', {
      name: name,
      side: side,
      attendance: attendance,
      checkin: false
    })
  },
  getGuests () {
    return Api().get('/guest')
  }
}
