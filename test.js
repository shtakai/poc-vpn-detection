function detectVPN() {
  var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return fetch(`https://ipapi.co/json`)
  .then(function(response) { return response.json() })
  .then(function (data) { 
    var ipTimezone = data.timezone
    console.log(`browser timezone: ${browserTimezone}`, `ip timezone: ${ipTimezone}`)
    return ipTimezone != browserTimezone
  })
}

detectVPN()
.then(function(usingVPN) {
  var body = document.getElementById('body')
  var element = document.getElementById('detection-result')
  var text = usingVPN ? element.textContent = "We know you're using a VPN" : element.textContent = "Ah, thanks for not using a VPN"
  usingVPN ? body.style.backgroundColor = '#FF4343' : body.style.backgroundColor = '#00CC6A'
})